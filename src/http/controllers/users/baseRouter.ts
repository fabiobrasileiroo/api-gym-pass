import { FastifyReply, FastifyRequest } from 'fastify'

export async function baseRouter(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.status(200).send('Api gym pass funcionando')
}
