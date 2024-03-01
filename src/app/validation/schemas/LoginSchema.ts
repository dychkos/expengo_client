import { z } from '../zod/zod-ua'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
