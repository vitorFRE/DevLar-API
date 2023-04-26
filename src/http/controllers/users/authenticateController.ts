import type { AuthenticateUseCaseProps } from '@/use-cases/authenticateUseCase'
import { InvalidCledentialsError } from '@/use-cases/errors/InvalidCredentialError'
import { InvalidEmailError } from '@/use-cases/errors/InvalidEmailError'
import { InvalidPasswordError } from '@/use-cases/errors/InvalidPasswordError'
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as AuthenticateUseCaseProps

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id
        }
      }
    )

    return await reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidEmailError) {
      return await reply.status(400).send({ message: error.message })
    }
    if (error instanceof InvalidPasswordError) {
      return await reply.status(400).send({ message: error.message })
    }
    if (error instanceof InvalidCledentialsError) {
      return await reply.status(400).send({ message: error.message })
    }

    return await reply.status(500).send({ message: 'Internal server error' })
  }
}
