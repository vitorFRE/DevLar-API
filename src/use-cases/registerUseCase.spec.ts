import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { RegisterUseCase } from './registerUseCase'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidPasswordError } from './errors/InvalidPasswordError'
import { BcryptHashGenerator } from '@/utils/BcryptHashGenerator'
import { PasswordValidatorAdapter } from '@/utils/PasswordValidator'

let usersRepository: InMemoryUsersRepository
let emailValidator: EmailValidatorAdapter
let passwordHashGenerator: BcryptHashGenerator
let passowrdValidator: PasswordValidatorAdapter
let sut: RegisterUseCase

describe('RegisterUseCase test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    emailValidator = new EmailValidatorAdapter()
    passwordHashGenerator = new BcryptHashGenerator()
    passowrdValidator = new PasswordValidatorAdapter()
    sut = new RegisterUseCase(
      usersRepository,
      emailValidator,
      passwordHashGenerator,
      passowrdValidator
    )
  })

  it('should create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: 'minhasenha777'
    })
    expect(user).toHaveProperty('id')
  })

  it('should not create a new user with an existing email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'jaexiste@email.com',
      password: 'minhasenha777'
    })

    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'jaexiste@email.com',
          password: 'minhasenha777'
        })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('password should be hashed', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'meuemail@email.com',
      password: 'minhasenha777'
    })

    const isPasswordHashed = await compare('minhasenha777', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not create a new user with an invalid email', async () => {
    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'invalid_email',
          password: 'minhasenha777'
        })
    ).rejects.toBeInstanceOf(InvalidEmailError)
  })

  it('should not create a new user whi an invalid password', async () => {
    await expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email: 'meuemail@email.com',
          password: 'senhai'
        })
    ).rejects.toBeInstanceOf(InvalidPasswordError)
  })
})
