import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation,
  useIsFocused
} from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';

import { Car as ModelCar } from '../../database/models/Car';
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

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([] as DataProps[]);
  const [loading, setLoading] = useState(true);

  const { goBack }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  const screenIsFocused = useIsFocused();

  async function fetchCars() {
    await api.get(`/rentals`)
    .then(response => {
      const dataFormatted = response.data.map((data: DataProps) => {
        return {
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }
      })
      setCars(dataFormatted);
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
  }, [screenIsFocused]);

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
          <LoadAnimation />
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
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.text}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
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