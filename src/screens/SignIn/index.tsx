import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Platform, 
  ScrollView,
} from 'react-native';

import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  return (
    <KeyboardAvoidingView 
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />

            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={() => {}}
              enabled={true}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}