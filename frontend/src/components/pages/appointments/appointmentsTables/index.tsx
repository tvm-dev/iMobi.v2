'use client';
import { PastAuctions } from '../pastAuctions';
import { Appointments } from './nextAppointments';
import { OldAppointments } from './oldAppointments';

export const AppointmentsTables = () => {
  return (
    <div>
      <Appointments />
      {/* Adicionar novo leilão */}
      <div id='past-auctions'>
        <PastAuctions state='create' />
      </div>

      {/* Leilões Passados */}
      <OldAppointments />
    </div>
  );
};
