import $v, { Schema } from '../app/validation/validation'
import { test, expect } from '@jest/globals'
import { greaterThenRule, oneOfRule, requiredRule } from '../app/validation/rules'
import { filterByCurrentWeek } from '../app/helper'

test('Filter By Current Week', () => {
  const now = new Date()

  const objects = [
    { createdAt: new Date(new Date(now).setDate(now.getDate() - 3)).toString() },
    { createdAt: new Date(new Date(now).setDate(now.getDate() - 6)).toString() },
    { createdAt: now.toString() },
  ]

  console.log('Obj to test', objects)

  const filtered = filterByCurrentWeek(objects, 1)

  expect(filtered).toHaveLength(objects.length)
})
