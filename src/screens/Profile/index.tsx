import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert, Keyboard } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';
import * as Yup from 'yup';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

export function Profile() {
  const { goBack }: NavigationProp<ParamListBase> = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const theme = useTheme();
  const netInfo = useNetInfo();
  
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    if(netInfo.isConnected === false && option === 'passwordEdit'){
      Alert.alert(
        'Oooops', 
        'Você precisa estar conectado para alterar sua senha'
      );
      return;
    } else {
      setOption(option);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result as ImageInfo;

    setAvatar(uri);

  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });

      const data = { driverLicense, name };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert('Perfil atualizado!')

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Erro', error.message);
        return;
      }
      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?', 
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ]
    )
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton 
                color={theme.colors.shape} 
                onPress={goBack}
              />

              <HeaderTitle>Editar Perfil </HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather 
                  name="power" 
                  size={24} 
                  color={theme.colors.shape} 
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name='camera'
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content
            style={{ marginBottom: useBottomTabBarHeight() }}
          >
            <Options>
              <Option 
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option 
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ? (
                <Section>
                  <Input 
                    iconName='user'
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />

                  <Input 
                    iconName='mail'
                    editable={false}
                    autoCorrect={false}
                    defaultValue={user.email}
                  />

                  <Input 
                    iconName='credit-card'
                    placeholder="CNH"
                    keyboardType='numeric'
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Section>
              ) : (
                <Section>
                  <InputPassword 
                    iconName='lock'
                    placeholder="Senha atual"
                  />

                  <InputPassword 
                    iconName='lock'
                    placeholder="Nova senha"
                  />

                  <InputPassword 
                  iconName='lock'
                  placeholder="Nova senha"
                  />
                </Section>
              )
            }

            <Button 
              title='Salvar alterações'   
              onPress={handleProfileUpdate} 
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}