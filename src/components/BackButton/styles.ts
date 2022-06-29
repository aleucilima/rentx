import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface BackButtonProps {
  children: React.ReactNode;
}

export const Container = styled(BorderlessButton)<BackButtonProps>`
  width: 38px;
  height: 38px;
`;

