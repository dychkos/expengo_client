class Validation {
  validate(data: any, schema: Schema) {
    const errors = []

    for (const field in data) {
      const rules: Array<Rule> = schema[field]

      if (!rules) {
        throw new Error(`${field} is not present in Schema.`)
      }

      for (const rule of rules) {
        const meta = rule.meta
        if (!rule.func(data[field], meta)) {
          errors.push(field)
        }
      }
    }

    return errors
  }
}

export interface Rule {
  func: (val: any, meta?: any) => Boolean
  meta?: any
}

export type Schema = {
  [key: string]: Array<Rule>
}

const validation = new Validation()
export default validation
