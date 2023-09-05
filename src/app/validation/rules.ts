import { ValidationRule } from './validation'

export enum ValidationKey {
  REQUIRED = 'required',
  // MIN_LENGTH = 'min_length',
  // MAX_LENGTH = 'max_length',
}

export const ValidationRules: Record<ValidationKey, ValidationRule> = {
  [ValidationKey.REQUIRED]: val => !!val,
  // [ValidationKey.MIN_LENGTH]: (val, meta) =>
  //   !!val && val.length > meta.minLength,
  // [ValidationKey.MAX_LENGTH]: (val, { maxLength }) =>
  //   !!val && val.length > maxLength,
}
