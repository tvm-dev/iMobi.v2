import { AppointmentsTables } from '@/components/pages/appointments/appointmentsTables';
import { Title } from '@/components/shared/Title';

export default function DashboardPage() {
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
