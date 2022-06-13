import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value },
        { translateX: positionX.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive: (event, ctx) => {
      positionY.value = ctx.positionY + event.translationY;
      positionX.value = ctx.positionX + event.translationX;
    },
    onEnd: () => {
      positionY.value = withSpring(0);
      positionX.value = withSpring(0);
    }
  });
  
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle, 
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});