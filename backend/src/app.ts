import Fastify, { type FastifyError } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import { STATUS_CODES } from 'node:http'
import { Type as T } from '@sinclair/typebox'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { ValidationProblem, ProblemDetails, User, Health } from './types.js'

const users: User[] = [
  { id: 'u-1', email: 'alice@example.com' },
  { id: 'u-2', email: 'bob@example.com' },
]

export async function buildApp() {
  const app = Fastify({
    logger: true,
    trustProxy: true,
    schemaErrorFormatter(errors, dataVar) {
      const msg = errors.map((e) => e.message).filter(Boolean).join('; ') || 'Validation failed'
      return new ValidationProblem(msg, errors, dataVar)
    },
  }).withTypeProvider<TypeBoxTypeProvider>()

  await app.register(helmet)
  await app.register(cors, { origin: [/^http:\/\/localhost:\d+$/], credentials: false })
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    enableDraftSpec: true,
  })
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: { title: 'Rooms API', version: '1.0.0' },
    },
  })

  app.setErrorHandler<FastifyError | ValidationProblem>((err, req, reply) => {
    const status = typeof err.statusCode === 'number' ? err.statusCode : 500
    const problem = {
      type: 'about:blank',
      title: STATUS_CODES[status] ?? 'Error',
      status,
      detail: err.message || 'Unexpected error',
      instance: req.url,
    }
    reply.code(status).type('application/problem+json').send(problem)
  })

  app.get('/api/users', {
    schema: {
      tags: ['Users'],
      response: { 200: { description: 'Список пользователей', content: { 'application/json': { schema: T.Array(User) } } } },
    },
  }, async () => users)

  app.get('/api/health', {
    schema: {
      tags: ['System'],
      response: { 200: { description: 'Ready', content: { 'application/json': { schema: Health } } } },
    },
  }, async () => ({ ok: true }))

  app.get('/openapi.json', { schema: { hide: true } }, async (_req, reply) => {
    reply.type('application/json').send(app.swagger())
  })

  return app
}