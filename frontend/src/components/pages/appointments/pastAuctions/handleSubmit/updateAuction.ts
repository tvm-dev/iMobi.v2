import {
  UpdateAppointmentData,
  updateAppointmentSchema,
} from '@/shared/schemas/appointment/updateAppointmentSchema';
import { api } from '@/shared/utils/api';

interface handleSubmitUpdateProps {
  e: React.FormEvent;
  appointmentNumber: string;
  formData: Partial<UpdateAppointmentData>;
  setFormData: (e: Partial<UpdateAppointmentData>) => void;
  setStatus: (e: string) => void;
  setNotes: (e: string) => void;
  notes: string;
  status: string;
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
    const response = await api.patch(`/appointment/${appointmentNumber}`, {
      ...fullData,
    });
    // Resetar formulário
    setFormData({});
    setStatus('');
    setNotes('');
    cancel && cancel();
  } catch (error) {
    console.error(error);
  }
};
