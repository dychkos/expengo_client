import { z } from '../zod/zod-ua'

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(3).max(20),
    confirmPassword: z.string().min(3).max(20),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ['confirmPassword'],
  })

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>
