import { Rule } from './validation'

export const greaterThenRule = (metaNum: number): Rule => {
  return {
    meta: metaNum,
    func: (val, meta) => val > meta,
  }
}

export const requiredRule = (): Rule => {
  return {
    meta: null,
    func: val => !!val,
  }
}

export const oneOfRule = (meta: Array<string>): Rule => {
  return {
    meta: meta,
    func: (val, meta) => meta.includes(val),
  }
}

// data obj
// {
//      firstname: requiredRule(),
//      age: greaterThanRule(3)
// }
