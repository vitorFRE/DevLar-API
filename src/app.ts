import fastify from 'fastify'
import { usersRoute } from './http/controllers/users/routes'

export const app = fastify()

void app.register(usersRoute)
