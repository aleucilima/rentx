import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';
import { Input } from '../../components/Input';


export function SignIn() {
  const theme = useTheme();

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

      <Form>
        <Input 
          iconName="mail"
          placeholder="E-mail"
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Form>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          onPress={() => {}}
          enabled={true}
          loading={false}
          light
        />
      </Footer>
      
    </Container>
  );
}