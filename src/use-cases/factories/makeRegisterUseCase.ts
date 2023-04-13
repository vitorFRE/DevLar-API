import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { RegisterUseCase } from '../registerUseCase'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'

export function makeRegisterUseCase(): RegisterUseCase {
  const UserRepository = new PrismaUsersRepository()
  const emailValidator = new EmailValidatorAdapter()
  const registerUseCase = new RegisterUseCase(UserRepository, emailValidator)

  return registerUseCase
}
