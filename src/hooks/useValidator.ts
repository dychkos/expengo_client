import { useState } from 'react'
import $v, { Schema } from '../app/validation/validation'

export const useValidator = () => {
  const [errors, setErrors] = useState<Array<string>>([])

  const checkError = (field: string) => errors.includes(field)

  const validate = (objToValidate: any, schema: Schema) => {
    const errors = $v.validate(objToValidate, schema)
    setErrors(errors)
    return errors.length === 0
  }

  return {
    errors,
    validate,
    checkError,
  }
}
