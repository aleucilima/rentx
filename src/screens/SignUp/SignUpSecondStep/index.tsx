import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'styled-components';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { goBack, navigate }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  async function handleRegister() {
    if(!password || !confirmPassword) {
      return Alert.alert('Opa!', 'Preencha todos os campos');
    }

    if(password !== confirmPassword) {
      return Alert.alert('Opa!', 'As senhas não conferem');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!'
      });
    })
    .catch((error) => {
      Alert.alert('Opa!', 'Erro ao criar a conta');
      console.log(error);
    });
  }

  return (
    <KeyboardAvoidingView 
      behavior='position'
      enabled
    >
      <Container>
        <Header>
          <BackButton onPress={goBack}/>

          <Steps>
            <Bullet />
            <Bullet active/>
          </Steps>
        </Header>

        <Title>Crie sua{'\n'}conta</Title>

        <SubTitle>
          Faça seu cadastro de{'\n'}
          forma rápida e fácil
        </SubTitle>

        <Form>
          <FormTitle>2. Senha</FormTitle>

          <InputPassword
            iconName='lock'
            placeholder='Senha'
            value={password}
            onChangeText={setPassword}
          />

          <InputPassword
            iconName='lock'
            placeholder='Repetir Senha'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </Form>

        <Button 
          title="Cadastrar"
          color={theme.colors.success}
          onPress={handleRegister}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}