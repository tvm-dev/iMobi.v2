'use client';
import { ScheduledAuctions } from './scheduledAuctions';
import { AppointmentTitle } from '../../../shared/AppointmentTitle';
import { FaCalendarCheck, FaCalendarDay, FaCalendarWeek } from 'react-icons/fa';

export const Appointments = () => {
  return (
    <div>
      {/* Leilões hoje */}
      <AppointmentTitle
        color='text-green-600'
        icon={<FaCalendarDay size={25} className='text-green-600' />}
        label='Leilões Hoje'
      />
      <ScheduledAuctions data='today' />
      {/* Leilões amanhã  */}
      <AppointmentTitle
        color='text-yellow-500'
        icon={<FaCalendarCheck size={25} className='text-yellow-500' />}
        label='Leilões Amanhã'
      />
      <ScheduledAuctions data='tomorrow' />
      {/* Todos os leilões  */}
      <AppointmentTitle
        color='text-sky-950'
        icon={<FaCalendarWeek size={25} className='text-sky-950' />}
        label='Próximos Leilões'
      />
      <ScheduledAuctions data='after' />
    </div>
  );
};
