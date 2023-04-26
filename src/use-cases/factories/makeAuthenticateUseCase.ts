import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { AuthenticateUseCase } from '../authenticateUseCase'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { PasswordValidatorAdapter } from '@/utils/PasswordValidator'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const UserRepository = new PrismaUsersRepository()
  const emailValidator = new EmailValidatorAdapter()
  const passwordValidator = new PasswordValidatorAdapter()
  const authenticateUseCase = new AuthenticateUseCase(
    UserRepository,
    emailValidator,
    passwordValidator
  )

  return authenticateUseCase
}
