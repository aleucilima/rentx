import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home() {
  const carData = {
    brand: 'Fiat',
    name: 'Uno',
    rent: {
      period: 'Ao dia',
      price: 100,
    },
    thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
  }


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
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1,2,3,4,5,6,7,8,9,10,11,12]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />

    </Container>
  );
}