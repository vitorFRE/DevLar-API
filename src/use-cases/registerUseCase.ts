import type { UsersRepository } from '@/repositories/usersRepository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import type { EmailValidator } from '@/@types/EmailValidatorType'
import { InvalidEmailError } from './errors/InvalidEmailError'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailValidator: EmailValidator
  ) {}

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    if (!this.emailValidator.isValid(email)) {
      throw new InvalidEmailError()
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists != null) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })

    return { user }
  }
}
