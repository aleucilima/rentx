import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation 
} from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { MyCarsButton } from '../../components/MyCarsButton';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  
  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  async function fetchCars() {
    await api.get('/cars')
    .then(response => {
      setCars(response.data as CarDTO[]);
    })
    .catch(error => {
      Alert.alert('Erro', 'Não foi possível carregar os carros');
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)} 
            height={RFValue(12)}
          />

          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { loading ? <Load /> : 
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Car data={item} onPress={() => handleCarDetails(item)} />
          }
        />
      }

      <MyCarsButton 
        onPress={handleOpenMyCars} 
      />
    </Container>
  );
}