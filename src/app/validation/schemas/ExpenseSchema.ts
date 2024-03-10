import { z } from '../zod/zod-ua'

export const ExpenseSchema = z.object({
  price: z.number().gte(1).lte(1_000_000),
  title: z.string().min(1),
  categoryId: z.string().min(1),
})

export type ExpenseSchemaType = z.infer<typeof ExpenseSchema>

// id: [requiredRule()],
// iconName: [requiredRule()],
// title: [requiredRule()],
// period: [requiredRule(), oneOfRule(['month', 'week'])],
// limit: [requiredRule(), greaterThenRule(1)],
// createdAt: [requiredRule()],
// color: [requiredRule()],
