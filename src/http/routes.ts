import type { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.get('/',(_req,reply) => {
     return reply.status(200).send('Criado com sucesso seu usuário')
  })
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
