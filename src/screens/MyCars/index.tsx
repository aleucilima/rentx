import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation,
  useRoute 
} from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);

  const { goBack }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();

  async function fetchCars() {
    await api.get(`/schedules_byuser?user_id=${1}`)
    .then(response => {
      setCars(response.data as CarProps[]);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchCars().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar style="light" />
        <BackButton
          onPress={goBack}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {
        loading ? (
          <Load />
      ) : (
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList 
              data={cars}
              keyExtractor={car => car.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.text}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
      )}



    </Container>
  );
}