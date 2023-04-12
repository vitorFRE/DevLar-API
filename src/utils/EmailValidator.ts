import { z } from 'zod'
import type { EmailValidator } from '@/@types/EmailValidatorType'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(value: string): boolean {
    try {
      z.string().email().parse(value)
      return true
    } catch (error) {
      return false
    }
  }
}
