import { greaterThenRule, numberRule, oneOfRule, requiredRule } from '../rules'

export const GoalInEditSchema = {
  id: [requiredRule()],
  iconName: [requiredRule()],
  category: [requiredRule()],
  period: [requiredRule(), oneOfRule(['month', 'week'])],
  limit: [requiredRule(), greaterThenRule(1)],
  current: [requiredRule(), greaterThenRule(1)],
}
