import React, { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';

import { 
  NavigationProp, 
  ParamListBase, 
  useNavigation 
} from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps } from '../../components/Calendar';
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation();
  const theme = useTheme();
  
  function handleConfirmRental() {
    navigate('SchedulingDetails');
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = 
  }
  
  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton 
          onPress={goBack} 
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>
              29/05/2022
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>
              29/05/2022
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={{}}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}