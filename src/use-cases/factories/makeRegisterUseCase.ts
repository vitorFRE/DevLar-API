import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'
import { RegisterUseCase } from '../registerUseCase'

export function makeRegisterUseCase(): RegisterUseCase {
  const UserRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(UserRepository)

  return registerUseCase
}
