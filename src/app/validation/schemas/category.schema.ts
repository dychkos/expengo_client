import { CategoryType } from '../../types/category.type'
import { greaterThenRule, oneOfRule, requiredRule } from '../rules'
import { Schema } from '../validation'

export const CategorySchema: Schema<CategoryType> = {
  id: [requiredRule()],
  iconName: [requiredRule()],
  title: [requiredRule()],
  period: [requiredRule(), oneOfRule(['month', 'week'])],
  limit: [requiredRule(), greaterThenRule(1)],
  createdAt: [requiredRule()],
}
