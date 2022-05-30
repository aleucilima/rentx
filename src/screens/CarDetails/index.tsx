import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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

export function CarDetails() {
  const theme = useTheme();

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

        <Accessories>
          <Acessory name="380Km/h" icon={speedSvg}/>
          <Acessory name="3.2s" icon={accelerationSvg}/>
          <Acessory name="800 HP" icon={forceSvg}/>
          <Acessory name="Gasolina" icon={gasolineSvg}/>
          <Acessory name="Auto" icon={exchangeSvg}/>
          <Acessory name="2 pessoas" icon={peopleSvg}/>

        </Accessories>

        <About>
          Este é automóvel desportivo. Surgiu do lendário 
          touro de lide indultadona praça Real Maestranza 
          de Sevilla. É um belíssimo carro para quem gosta 
          de acelerar.
        </About>

      </Content>

      <Footer>
        <Button
          title="Confirmar"
          color={theme.colors.main}
        />
      </Footer>
    </Container>
  );
}