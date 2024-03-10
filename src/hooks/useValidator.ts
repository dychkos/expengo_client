import {useEffect, useState} from 'react'
import z from 'zod'

export const useValidator = <T extends z.ZodObject<any, any>>() => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const checkError = (field: string) => !!errors[field]

  const validate = (objToValidate: any, schema: T) => {
    try {
      setErrors({});
      schema.parse(objToValidate)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {}
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
        triggerShakeAnimation();
      } else {
        console.error('Validation error:', error)
        setErrors({})
      }
      return false
    }
  }

  const clearError = (field: string) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }
      delete newErrors[field]
      return newErrors
    })
  }

  const triggerShakeAnimation = () => {
    const shakeElements = document.querySelectorAll('.shake-elem');
    shakeElements.forEach(el => {
      el.classList.remove('animate-shake');

      setTimeout(() => {
        el.classList.add('animate-shake');
      }, 100);
    });
  }

  return {
    errors,
    validate,
    checkError,
    clearError,
  }
}
