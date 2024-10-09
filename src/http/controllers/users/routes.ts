import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { baseRouter } from './baseRouter'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', baseRouter)

  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authentication */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
