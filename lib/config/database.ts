import { PrismaClient } from '@prisma/client'
import { db } from '@/lib/db'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: `file:${db.name}`
    }
  }
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}