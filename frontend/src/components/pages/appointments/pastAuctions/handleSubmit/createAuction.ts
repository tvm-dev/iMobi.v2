import {
  CreateAppointmentData,
  createAppointmentSchema,
} from '@/shared/schemas/appointment/createAppointmentSchema';
import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

interface handleSubmitCreateProps {
  e: React.FormEvent;
  cancel?: () => void;
  formData: Partial<CreateAppointmentData>;
  setFormData: (e: Partial<CreateAppointmentData>) => void;
  setStatus: (e: string) => void;
  setNotes: (e: string) => void;
  notes: string;
  status: string;
  fetchAppointments: () => void;
}

export const handleSubmitCreate = async ({
  e,
  cancel,
  formData,
  notes,
  setFormData,
  setNotes,
  setStatus,
  status,
  fetchAppointments,
}: handleSubmitCreateProps) => {
  e.preventDefault();
  console.log('create');
  try {
    const fullData = {
      ...formData,
      status,
      observations: notes || 'Sem ações definidas',
    };
    console.log('create2');
    const result = createAppointmentSchema.safeParse(fullData);

    if (!result.success) {
      toast.error(result.error.errors[0]?.message || 'Erro ao validar dados');
      return;
    }
    await api.post('/appointment', { ...fullData });
    // Resetar formulário
    setFormData({});
    setStatus('');
    setNotes('');
    fetchAppointments();
    cancel && cancel();
    toast.success('Agendamento criado com sucesso');
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
