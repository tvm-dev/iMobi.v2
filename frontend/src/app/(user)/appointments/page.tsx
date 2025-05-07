import { AppointmentsTables } from '@/components/pages/appointments/appointmentsTables';
import { Title } from '@/components/shared/Title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iMobi - Agendamentos',
  description: 'Agende seus leilões',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function AppointmentPage() {
  return (
    <div>
      <Title
        className='text-center mt-4 text-navy'
        label='Seus Leilões Agendados'
        size='1'
        line='center'
      />
      {/* Agendamentos */}
      <AppointmentsTables />
    </div>
  );
}
