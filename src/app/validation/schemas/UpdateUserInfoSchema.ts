import { z } from '../zod/zod-ua'

export const UpdateUserInfoSchema = z.object({
  // email: z.string().email(),
  lastName: z.string().min(3).max(25),
  firstName: z.string().min(3).max(25),
})

export type UpdateUserInfoType = z.infer<typeof UpdateUserInfoSchema>
