import { hash } from 'bcryptjs'
import type { PasswordHashGenerator } from '@/@types/PasswordHashGeneratorType'

export class BRcryptHashGenerator implements PasswordHashGenerator {
  async generate(value: string): Promise<string> {
    const saltRounds = 6
    const hashedValue = await hash(value, saltRounds)
    return hashedValue
  }
}
