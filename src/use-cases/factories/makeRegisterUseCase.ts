import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { RegisterUseCase } from '../registerUseCase'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { BRcryptHashGenerator } from '@/utils/BcryptHashGenerator'

export function makeRegisterUseCase(): RegisterUseCase {
  const UserRepository = new PrismaUsersRepository()
  const emailValidator = new EmailValidatorAdapter()
  const passwordHashGenerator = new BRcryptHashGenerator()
  const registerUseCase = new RegisterUseCase(
    UserRepository,
    emailValidator,
    passwordHashGenerator
  )

  return registerUseCase
}
