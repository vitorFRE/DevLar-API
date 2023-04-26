import type { UsersRepository } from '@/repositories/usersRepository'
import type { User } from '@prisma/client'
import { InvalidCledentialsError } from './errors/InvalidCredentialError'
import { compare } from 'bcryptjs'
import type { EmailValidator } from '@/@types/EmailValidatorType'
import type { PasswordValidator } from '@/@types/PasswordValidatorType'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidPasswordError } from './errors/InvalidPasswordError'

export interface AuthenticateUseCaseProps {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly emailValidator: EmailValidator,
    private readonly passwordValidator: PasswordValidator
  ) {}

  async execute({
    email,
    password
  }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!this.emailValidator.isValid(email)) {
      throw new InvalidEmailError()
    }

    if (!this.passwordValidator.isValid(password)) {
      throw new InvalidPasswordError()
    }

    if (user === null) {
      throw new InvalidCledentialsError()
    }

    const isPasswordCorrect = await compare(password, user.password_hash)

    if (!isPasswordCorrect) {
      throw new InvalidCledentialsError()
    }

    return { user }
  }
}
