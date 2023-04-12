import { InMemoryUsersRepository } from '@/repositories/inMemory/InMemoryUsersRepository'
import { RegisterUseCase } from './registerUseCase'
import { beforeEach, describe, expect, it } from 'vitest'

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
})
