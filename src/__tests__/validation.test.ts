import $v, { Schema } from '../app/validation/validation'
import { test, expect } from '@jest/globals'
import {
  greaterThenRule,
  oneOfRule,
  requiredRule,
} from '../app/validation/rules'

test('Validation pass', () => {
  const objToValidate = {
    firstname: 'Cars',
    age: 21,
    period: 'week',
  }

  const schema: Schema = {
    firstname: [requiredRule()],
    age: [greaterThenRule(4)],
    period: [requiredRule(), oneOfRule(['month', 'week'])],
  }

  const error = $v.validate(objToValidate, schema)
  expect(error).toHaveLength(0)
})

test('Validation fails', () => {
  const objToValidate = {
    firstname: '',
    age: 22,
  }

  const schema: Schema = {
    firstname: [requiredRule()],
    age: [greaterThenRule(25)],
  }

  const error = $v.validate(objToValidate, schema)
  expect(error).toHaveLength(2)
})
