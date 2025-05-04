'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { format, addDays } from 'date-fns';
import { Appointment } from '../types/Appointment';
import { api } from '../utils/api';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

interface AppointmentContextData {
  appointmentTodayBefore: Appointment[];
  appointmentTodayAfter: Appointment[];
  appointmentToday: Appointment[];
  appointmentTomorrow: Appointment[];
  fetchAppointments: () => void;
}

const AppointmentContext = createContext<AppointmentContextData | undefined>(
  undefined
);

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const fetchAppointments = useCallback(async () => {
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

      let message = 'Erro desconhecido. Tente novamente.';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointmentTodayBefore,
        appointmentTodayAfter,
        appointmentToday,
        appointmentTomorrow,
        fetchAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      'useAppointment deve ser usado dentro de um AppointmentProvider'
    );
  }
  return context;
};
