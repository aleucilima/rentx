
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  onPress,
}: Props) {
  const theme = useTheme();

  const containerProps = {
    color: color || theme.colors.main,
    enabled: enabled,
    style: { opacity: enabled === false || loading === true ? 0.5 : 1 },
    onPress: onPress
  }

  return (
    <Container
      {...containerProps}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}