import React from 'react';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
} from './styles';

interface Props {
  color: string;
}

export function BackButton({ color }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <MaterialIcons 
        name="chevron-left" 
        size={24} 
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}