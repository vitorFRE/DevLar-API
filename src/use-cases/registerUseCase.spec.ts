import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { RegisterUseCase } from './registerUseCase'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { BcryptHashGenerator } from '@/utils/BcryptHashGenerator'

let usersRepository: InMemoryUsersRepository
let emailValidator: EmailValidatorAdapter
let passwordHashGenerator: BcryptHashGenerator
let sut: RegisterUseCase

describe('RegisterUseCase test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    emailValidator = new EmailValidatorAdapter()
    passwordHashGenerator = new BcryptHashGenerator()
    sut = new RegisterUseCase(usersRepository, emailValidator, passwordHashGenerator)
  })

  it('should create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123456'
    })
    expect(user).toHaveProperty('id')
  })

  it('should not create a new user with an existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'jaexiste@email.com',
      password: '123456'
    })

    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'jaexiste@email.com',
          password: '123456'
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('password should be hashed', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jaexiste@email.com',
      password: '123456'
    })

    const isPasswordHashed = await compare('123456', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not create a new user with an invalid email', async () => {
    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'invalid_email',
          password: '123456'
        })
    ).rejects.toBeInstanceOf(InvalidEmailError)
  })
})
