import { InvalidEmailError } from '@/use-cases/errors/InvalidEmailError'
import { InvalidPasswordError } from '@/use-cases/errors/InvalidPasswordError'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/makeRegisterUseCase'
import type { RegisterUseCaseProps } from '@/use-cases/registerUseCase'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const { name, email, password } = request.body as RegisterUseCaseProps

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(400).send({ message: error.message })
    }

    if (error instanceof InvalidEmailError) {
      return await reply.status(400).send({ message: error.message })
    }

    if (error instanceof InvalidPasswordError) {
      return await reply.status(400).send({ message: error.message })
    }

    return await reply.status(500).send({ message: 'Internal server error' })
  }

  return await reply.status(201).send()
}
