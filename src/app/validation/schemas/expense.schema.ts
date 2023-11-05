import { Schema } from '../validation'
import { ExpenseType } from '../../types/expense.type'
import { greaterThenRule, numberRule, requiredRule } from '../rules'

export const ExpenseSchema: Schema<ExpenseType> = {
  id: [requiredRule()],
  goalId: [requiredRule()],
  price: [requiredRule(), numberRule(), greaterThenRule(1)],
  title: [requiredRule()],
  createdAt: [requiredRule()],
}
