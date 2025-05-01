import {
  CreateAppointmentData,
  createAppointmentSchema,
} from '@/shared/schemas/appointment/createAppointmentSchema';
import { api } from '@/shared/utils/api';

interface handleSubmitCreateProps {
  e: React.FormEvent;
  cancel?: () => void;
  formData: Partial<CreateAppointmentData>;
  setFormData: (e: Partial<CreateAppointmentData>) => void;
  setStatus: (e: string) => void;
  setNotes: (e: string) => void;
  notes: string;
  status: string;
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
      console.error(result);
      // setError(result.error.errors[0]?.message || 'Erro ao validar dados');
      return;
    }
    const response = await api.post('/appointment', { ...fullData });
    console.log(response.data);
    // Resetar formulário
    setFormData({});
    setStatus('');
    setNotes('');
    cancel && cancel();
  } catch (error) {
    console.error(error);
  }
};
