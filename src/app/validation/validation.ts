class Validation {
  private readonly fields: ValidationField | null
  private readonly rules: Record<string, ValidationRule>

  constructor(
    fields: ValidationField | null,
    rules: Record<string, ValidationRule>,
  ) {
    this.fields = fields
    this.rules = rules
  }

  validate(): Record<string, string> {
    const errors: Record<string, string> = {}

    for (const field in this.fields) {
      for (const ruleName in this.rules) {
        const rule = this.rules[ruleName]
        const fieldValue = this.fields[field]

        // Check if the rule fails
        if (!rule(fieldValue)) {
          // Add an error message to the errors object
          errors[field] = `${field} is invalid.`
          break // Break out of the inner loop after the first failure
        }
      }
    }

    return errors
  }
}

export type ValidationRule = (val: any, meta?: ValidationMeta) => boolean
export type ValidationField = { [key: string]: any }
export type ValidationMeta = {
  minLength?: number
  maxLength?: number
}

export default Validation
