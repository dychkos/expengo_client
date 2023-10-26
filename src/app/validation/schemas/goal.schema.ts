import { greaterThenRule, oneOfRule, requiredRule } from '../rules'
import { GoalType } from '../../types/goal.type'
import { Schema } from '../validation'

export const GoalInEditSchema: Schema<GoalType> = {
  //todo: rename into 'GoalSchema'
  id: [requiredRule()],
  iconName: [requiredRule()],
  category: [requiredRule()],
  period: [requiredRule(), oneOfRule(['month', 'week'])],
  limit: [requiredRule(), greaterThenRule(1)],
  createdAt: [requiredRule()],
}
