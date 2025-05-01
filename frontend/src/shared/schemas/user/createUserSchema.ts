import { z } from 'zod';

export const createAppointmentSchema = z.object({
  name: z.string().min(1, 'Descrição é obrigatória'),
  email: z.string().email().min(1, 'Email é obrigatório'),
  password: z
    .string()
    .min(16, 'Senha é obrigatório e deve ter no minimo 6 caracteres'),
});

// Inferência de tipo para uso com TypeScript
export type CreateAppointmentData = z.infer<typeof createAppointmentSchema>;
