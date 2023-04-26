import type { FastifyInstance } from 'fastify'
import { registerController } from './registerController'
import { authenticateController } from './authenticateController'

export async function usersRoute(app: FastifyInstance): Promise<void> {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
}
