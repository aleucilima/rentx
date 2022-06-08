import React, { useEffect, useState } from 'react';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
} from './styles';

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCars() {
    await api.get(`/schedules_bycars?user_id=${1}`)
    .then(response => {
      setCars(response.data);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchCars().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container>

    </Container>
  );
}