'use client';
import { FaHistory } from 'react-icons/fa';
import { ScheduledAuctions } from '../nextAppointments/scheduledAuctions';
import { AppointmentTitle } from '@/components/shared/AppointmentTitle';

export const OldAppointments = () => {
  return (
    <div className='mt-5'>
      <AppointmentTitle
        color='text-sky-950'
        icon={<FaHistory size={25} className='text-sky-950' />}
        label='Leilões Passados'
      />
      <ScheduledAuctions data='before' />
    </div>
  );
};
