'use client';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaHistory } from 'react-icons/fa';
import { AppointmentTitle } from '../../../shared/AppointmentTitle';
import { oldAppointmentsTable } from '@/shared/constants/oldAppointmentsInput';
import { ScheduledAuctions } from '../appointments/scheduledAuctions';

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
