import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation 
} from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

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

  const netInfo = useNetInfo();
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  
  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {

  }
  
  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      await api.get('/cars')
      .then(response => {
        if(isMounted) {
          setCars(response.data as CarDTO[]);
        }
      })
      .catch(error => {
        Alert.alert('Erro', 'Não foi possível carregar os carros');
        console.error(error);
      })
      .finally(() => {
        if(isMounted) {
          setLoading(false);
        }
      });
    }

    fetchCars();
    
    return () => {
      isMounted = false;
    }
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
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      { loading ? <LoadAnimation /> : 
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Car data={item} onPress={() => handleCarDetails(item)} />
          }
        />
      }
    </Container>
  );
}
