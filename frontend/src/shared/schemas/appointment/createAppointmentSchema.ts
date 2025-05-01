// schemas/appointmentSchema.ts
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  location: z.string().min(1, 'Local é obrigatório'),
  link: z.string().min(1, 'Link é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  date: z.date(),
});

// Inferência de tipo para uso com TypeScript
export type CreateAppointmentData = z.infer<typeof createAppointmentSchema>;
