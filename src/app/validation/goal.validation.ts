import { ValidationKey, ValidationRules } from './rules'

const v = ValidationRules

export const GoalValidationRules = {
  iconName: v[ValidationKey.REQUIRED],
  period: v[ValidationKey.REQUIRED],
  category: v[ValidationKey.REQUIRED],
  limit: v[ValidationKey.REQUIRED],
  current: v[ValidationKey.REQUIRED],
}
