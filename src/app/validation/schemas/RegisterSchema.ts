import { z } from '../zod/zod-ua'

export const RegisterSchema = z.object({
  email: z.string().email(),
  lastName: z.string().min(3).max(25),
  firstName: z.string().min(3).max(25),
  password: z.string().min(3).max(20),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
