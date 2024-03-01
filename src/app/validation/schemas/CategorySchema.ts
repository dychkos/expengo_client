import { z } from '../zod/zod-ua'

export const CategorySchema = z.object({
  iconName: z.string(),
  title: z.string().min(3).max(25),
  limit: z.coerce.number().gte(10).lte(9_999_999),
  color: z.string(),
  period: z.enum(['month', 'week']),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>

// id: [requiredRule()],
// iconName: [requiredRule()],
// title: [requiredRule()],
// period: [requiredRule(), oneOfRule(['month', 'week'])],
// limit: [requiredRule(), greaterThenRule(1)],
// createdAt: [requiredRule()],
// color: [requiredRule()],
