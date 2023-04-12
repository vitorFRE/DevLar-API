import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { RegisterUseCase } from './registerUseCase'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('RegisterUseCase test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123456'
    })
    console.log(user)
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
})
