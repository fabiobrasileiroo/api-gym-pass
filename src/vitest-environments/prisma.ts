import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const PrismaTestEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)
    console.log(generateDatabaseURL(schema))
    process.env.DATABASE_URL = databaseURL
    // Perform any setup you need for the Prisma environment
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        // Perform any teardown you need for the Prisma environment
        await prisma.$disconnect
      },
      transformMode: 'ssr', // Use either 'ssr' or 'web', depending on your needs
    }
  },
  transformMode: 'ssr',
}

export default PrismaTestEnvironment
