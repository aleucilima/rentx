import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation,
  useRoute, 
} from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>{car.about}</About>

      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          color={theme.colors.main}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}