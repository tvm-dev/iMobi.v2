import {
  UpdateAppointmentData,
  updateAppointmentSchema,
} from '@/shared/schemas/appointment/updateAppointmentSchema';
import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface handleSubmitUpdateProps {
  e: React.FormEvent;
  appointmentNumber: string;
  formData: Partial<UpdateAppointmentData>;
  setFormData: (e: Partial<UpdateAppointmentData>) => void;
  setStatus: (e: string) => void;
  setNotes: (e: string) => void;
  notes: string;
  status: string;
  fetchAppointments: () => void;
  cancel?: () => void;
}

export const handleSubmitUpdate = async ({
  e,
  cancel,
  appointmentNumber,
  formData,
  notes,
  setFormData,
  setNotes,
  setStatus,
  status,
  fetchAppointments,
}: handleSubmitUpdateProps) => {
  e.preventDefault();
  console.log('update');
  try {
    const fullData = {
      ...formData,
      status,
      observations: notes || 'Sem ações definidas',
    };
    console.log('update2');
    const result = updateAppointmentSchema.safeParse(fullData);

    if (!result.success) {
      console.error(result);
      // setError(result.error.errors[0]?.message || 'Erro ao validar dados');
      return;
    }
    await api.patch(`/appointment/${appointmentNumber}`, {
      ...fullData,
    });
    // Resetar formulário
    setFormData({});
    setStatus('');
    setNotes('');
    fetchAppointments();
    cancel?.();
    toast.success('Agendamento atualizado com sucesso');
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
