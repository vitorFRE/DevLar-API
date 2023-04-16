import { z } from 'zod'
import type { PasswordValidator } from '@/@types/PasswordValidatorType'

export class PasswordValidatorAdapter implements PasswordValidator {
  isValid(value: string): boolean {
    try {
      z.string().min(8).parse(value)
      return true
    } catch (error) {
      return false
    }
  }
}
