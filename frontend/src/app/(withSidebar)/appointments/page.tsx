import { Appointments } from '@/components/pages/appointments/appointments';
import { OldAppointments } from '@/components/pages/appointments/oldAppointments';
import { PastAuctions } from '@/components/pages/appointments/pastAuctions';
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
      <Appointments />
      {/* Adicionar novo leilão */}
      <div id='past-auctions'>
        <PastAuctions />
      </div>

      {/* Leilões Passados */}
      <OldAppointments />
    </div>
  );
}
