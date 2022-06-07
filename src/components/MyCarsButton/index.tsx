import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
} from './styles';

interface Props extends RectButtonProps {}

export function MyCarsButton({ ...rest }: Props) {
  const theme = useTheme();
  
  return (
    <Container {...rest}>
      <Ionicons 
        name="ios-car-sport" 
        size={RFValue(32)}
        color={theme.colors.shape}
      />
    </Container>
  );
}