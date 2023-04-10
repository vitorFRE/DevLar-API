import { type Prisma, Role, type User } from '@prisma/client'
import type { UsersRepository } from '../usersRepository'

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'd3f4f5g6h7j8k9l0',
      name: data.name,
      email: data.email,
      role: Role.MEMBER,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (user !== undefined && user !== null) {
      return user
    }

    return null
  }
}
