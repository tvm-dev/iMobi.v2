// schemas/appointmentSchema.ts
import { z } from 'zod';

export const updateAppointmentSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  location: z.string().min(1, 'Local é obrigatório').optional(),
  link: z.string().min(1, 'Link é obrigatório').optional(),
  status: z.string().min(1, 'Status é obrigatório').optional(),
  actions: z.string().min(1, 'Ações são obrigatórias').optional(),
});

// Inferência de tipo para uso com TypeScript
export type UpdateAppointmentData = z.infer<typeof updateAppointmentSchema>;
