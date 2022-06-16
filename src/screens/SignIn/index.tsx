import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
} from 'react-native';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation 
} from '@react-navigation/native';

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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
      });
  
      await schema.validate({ email, password })

      navigate('Home');

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          Alert.alert('Opa', err.message);
        })
      }

      Alert.alert(
        'Erro na autenticação', 
        'Houve um erro ao fazer login, verifique suas credenciais'
      );
    }
  }

  function handleNewAccount() {
    navigate('SignUpFirstStep');
  }

  return (
    <>
      <KeyboardAvoidingView 
        behavior='position'
        enabled
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
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
                onPress={handleSignIn}
                enabled={!loading}
                loading={loading}
              />

              <Button
                title="Criar conta gratuita"
                color={theme.colors.background_secondary}
                onPress={handleNewAccount}
                enabled={true}
                light
              />
            </Footer>
          </Container>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </>
  );
}