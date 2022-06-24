import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import api from '../../services/api';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation 
} from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import Logo from '../../assets/logo.svg';
import { Car as ModelCar } from '../../database/models/Car';

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
  const [cars, setCars] = useState<ModelCar[]>([]);

  const netInfo = useNetInfo();
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  
  function handleCarDetails(car: ModelCar) {
    navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };

      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        console.log(user)
        if (user.updated.length > 0) {
          await api.post('/users/sync', user);
        }
      }
    })
  }
  
  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        console.log(carCollection)

        if(isMounted) {
          setCars(cars);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os carros');
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    
    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if(netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

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
