import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { RegisterUseCase } from '../registerUseCase'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { BcryptHashGenerator } from '@/utils/BcryptHashGenerator'
import { PasswordValidatorAdapter } from '@/utils/PasswordValidator'

export function makeRegisterUseCase(): RegisterUseCase {
  const UserRepository = new PrismaUsersRepository()
  const emailValidator = new EmailValidatorAdapter()
  const passwordHashGenerator = new BcryptHashGenerator()
  const passwordValidator = new PasswordValidatorAdapter()
  const registerUseCase = new RegisterUseCase(
    UserRepository,
    emailValidator,
    passwordHashGenerator,
    passwordValidator
  )

  return registerUseCase
}
