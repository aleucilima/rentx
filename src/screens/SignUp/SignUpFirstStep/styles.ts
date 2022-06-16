import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + RFPercentage(5)}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};

  margin-top: ${RFPercentage(5)}px;
  margin-bottom: 16px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;

`;

export const Form = styled.View`
  width: 100%;
  margin-top: ${RFPercentage(5)}px;
  margin-bottom: 16px;
`;

export const FormTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;

  margin-bottom: 24px;
`;