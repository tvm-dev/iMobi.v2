'use client';
import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import { Appointment } from '../types/Appointment';
import { api } from '../utils/api';

export const useAppointment = () => {
  const [appointmentTodayBefore, setAppointmentTodayBefore] = useState<
    Appointment[]
  >([]);
  const [appointmentTodayAfter, setAppointmentTodayAfter] = useState<
    Appointment[]
  >([]);
  const [appointmentToday, setAppointmentToday] = useState<Appointment[]>([]);
  const [appointmentTomorrow, setAppointmentTomorrow] = useState<Appointment[]>(
    []
  );

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const today = format(new Date(), 'yyyy-MM-dd');
        const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

        const [resToday, resTomorrow, resBefore, resAfter] = await Promise.all([
          api.get(`/appointment/data?data=${today}&where=in`),
          api.get(`/appointment/data?data=${tomorrow}&where=in`),
          api.get(`/appointment/data?data=${today}&where=before`),
          api.get(`/appointment/data?data=${today}&where=after`),
        ]);
        setAppointmentToday(resToday.data);
        setAppointmentTomorrow(resTomorrow.data);
        setAppointmentTodayBefore(resBefore.data);
        setAppointmentTodayAfter(resAfter.data);
      } catch (error) {
        console.error('Erro ao buscar compromissos:', error);
        setAppointmentTodayBefore([]);
      }
    };

    fetchAppointment();
  }, []);

  return {
    appointmentTodayBefore,
    appointmentToday,
    appointmentTomorrow,
    appointmentTodayAfter,
  };
};
