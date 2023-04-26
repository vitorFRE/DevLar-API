import fastify from 'fastify'
import { usersRoute } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

void app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

void app.register(usersRoute)
