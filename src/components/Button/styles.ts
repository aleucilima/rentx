import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


interface ButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;

  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;