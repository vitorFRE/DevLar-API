import type { FastifyInstance } from 'fastify'
import { registerController } from './registerController'

export async function usersRoute(app: FastifyInstance): Promise<void> {
  app.post('/users', registerController)
}
