import { useState } from 'react'
import z from 'zod'

export const useValidator = <T extends z.ZodObject<any, any>>() => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const checkError = (field: string) => !!errors[field]

  const validate = (objToValidate: any, schema: T) => {
    try {
      schema.parse(objToValidate)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {}
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        console.log('Zod1 >>', errors)

        setErrors(fieldErrors)
      } else {
        console.error('Validation error:', error)
        setErrors({})
      }
      return false
    } finally {
      console.log('Zod >>', errors)
    }
  }

  const clearError = (field: string) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      delete newErrors[field]
      return newErrors
    })
  }

  return {
    errors,
    validate,
    checkError,
    clearError,
  }
}
