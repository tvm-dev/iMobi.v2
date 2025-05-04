import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface deleteAuctionProps {
  id: string;
  fetchAppointments: () => void;
}

export const deleteAuction = async ({
  fetchAppointments,
  id,
}: deleteAuctionProps) => {
  try {
    await api.delete(`/appointment/${id}`);

    toast.success('Agendamento deletado com sucesso');
    fetchAppointments();
  } catch (error) {
    console.error(error);
    let message = 'Erro desconhecido. Tente novamente.';

    if (isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
  }
};
