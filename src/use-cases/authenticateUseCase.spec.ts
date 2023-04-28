import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticateUseCase'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { PasswordValidatorAdapter } from '@/utils/PasswordValidator'
import { hash } from 'bcryptjs'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidPasswordError } from './errors/InvalidPasswordError'
import { InvalidCledentialsError } from './errors/InvalidCredentialError'

let usersRepository: InMemoryUsersRepository
let emailValidator: EmailValidatorAdapter
let passowrdValidator: PasswordValidatorAdapter
let sut: AuthenticateUseCase

describe('AuthenticateUseCase test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    emailValidator = new EmailValidatorAdapter()
    passowrdValidator = new PasswordValidatorAdapter()
    sut = new AuthenticateUseCase(usersRepository, emailValidator, passowrdValidator)
  })

  it('Should allow user authentication', async () => {
    await usersRepository.create({
      name: 'Lee',
      email: 'lee779@link.com',
      password_hash: await hash('minhaSenhaValida1', 6)
    })

    const { user } = await sut.execute({
      email: 'lee779@link.com',
      password: 'minhaSenhaValida1'
    })

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name', 'Lee')
    expect(user).toHaveProperty('email', 'lee779@link.com')
  })

  it('Should not allow user to authentication with invalid email', async () => {
    await usersRepository.create({
      name: 'Lee',
      email: 'lee779@link.com',
      password_hash: await hash('minhaSenhaValida1', 6)
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'lee779@.com',
          password: 'minhaSenhaValida1'
        })
    ).rejects.toBeInstanceOf(InvalidEmailError)
  })

  it('Should not allow user to authentication with invalid password', async () => {
    await usersRepository.create({
      name: 'Lee',
      email: 'lee779@link.com',
      password_hash: await hash('minhaSenhaValida1', 6)
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'lee779@link.com',
          password: 'senha'
        })
    ).rejects.toBeInstanceOf(InvalidPasswordError)
  })

  it('Should not allow user to authentication with incorrect email or password', async () => {
    await usersRepository.create({
      name: 'Lee',
      email: 'lee779@link.com',
      password_hash: await hash('minhaSenhaValida1', 6)
    })

    await expect(
      async () =>
        await sut.execute({
          email: 'lee779@link.com',
          password: 'minhaSenhaValida2'
        })
    ).rejects.toBeInstanceOf(InvalidCledentialsError)
  })
})
