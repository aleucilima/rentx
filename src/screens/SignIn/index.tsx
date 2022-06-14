import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Buttons
} from './styles';


export function SignIn() {
  return (
    <Container>
      <StatusBar style="dark" />
      <Header>
        <Title>
          Estamos{'\n'}
          quase lá.
        </Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Buttons>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </Buttons>
      
    </Container>
  );
}