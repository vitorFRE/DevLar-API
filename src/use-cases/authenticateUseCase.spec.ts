import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticateUseCase'
import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { EmailValidatorAdapter } from '@/utils/EmailValidator'
import { PasswordValidatorAdapter } from '@/utils/PasswordValidator'
import { hash } from 'bcryptjs'

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
})
