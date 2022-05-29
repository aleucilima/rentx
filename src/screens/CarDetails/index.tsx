import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
} from './styles';

export function CarDetails() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Fiat</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 40,00</Price>
          </Rent>
        </Details>
      </Content>
    </Container>
  );
}