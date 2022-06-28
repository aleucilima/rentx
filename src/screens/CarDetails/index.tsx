import React, { useState, useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { StyleSheet } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  Extrapolate,
  interpolate
} from 'react-native-reanimated';

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
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  OfflineInfo,
  Footer,
} from './styles';

import { Car as ModelCar } from '../../database/models/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const netInfo = useNetInfo();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleConfirmRental() {
    navigate('Scheduling', { car });
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    fetchCarUpdated();
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar style="dark" />
      
      <Animated.View
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={goBack} />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider 
              imagesUrl={
                !!carUpdated.photos ? 
                carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail}]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$ { netInfo.isConnected === true ? car.price : '...' }
            </Price>
          </Rent>
        </Details>
        {
          carUpdated.accessories && (
            <Accessories>
              {
                carUpdated.accessories.map(accessory => (
                  <Accessory 
                    key={accessory.type}
                    name={accessory.name}
                    icon={getAccessoryIcon(accessory.type)}
                  />
                ))
              }
            </Accessories>
          )
        }
        <About>
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          color={theme.colors.main}
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false && (
            <OfflineInfo>
              Conecte-se a Internet para ver mais detalhes e agendar seu carro
            </OfflineInfo>
          )
        }
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
});