import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation, 
  useRoute
} from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

interface Params {
  title: string;
  message?: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { width } = useWindowDimensions();
  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar style="light" />
      <LogoSvg width={width}/>

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>{ title }</Title>

        <Message>
          { message }
        </Message>
      </Content>

      <Footer>
        <ConfirmButton 
          title="Ok"
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}