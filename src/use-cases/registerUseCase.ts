import type { UsersRepository } from '@/repositories/usersRepository'
import type { User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import type { EmailValidator } from '@/@types/EmailValidatorType'
import { InvalidEmailError } from './errors/InvalidEmailError'
import type { PasswordHashGenerator } from '@/@types/PasswordHashGeneratorType'
import type { PasswordValidator } from '@/@types/PasswordValidatorType'

export interface RegisterUseCaseProps {
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
    private readonly emailValidator: EmailValidator,
    private readonly passwordHashGenerator: PasswordHashGenerator,
    private readonly passwordValidator: PasswordValidator
  ) {}

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const passwordHash = await this.passwordHashGenerator.generate(password)

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
