import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import fs from 'fs'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
  process.env.TMPDIR = '/tmp'
  process.env.SQLITE_TMPDIR = '/tmp'
  process.env.TMP = '/tmp'
  process.env.TEMP = '/tmp'
}

let dbUrl = process.env.DATABASE_URL

if (!dbUrl || dbUrl.startsWith("file:")) {
  if (process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/dev.db'
    if (!fs.existsSync(tmpDbPath)) {
      try {
        const sourceDbPath = path.join(process.cwd(), 'dev.db')
        if (fs.existsSync(sourceDbPath)) {
          fs.copyFileSync(sourceDbPath, tmpDbPath)
        } else {
          const prismaDbPath = path.join(process.cwd(), 'prisma', 'dev.db')
          if (fs.existsSync(prismaDbPath)) {
            fs.copyFileSync(prismaDbPath, tmpDbPath)
          }
        }
      } catch (e) {
        console.error('Error copying dev.db to /tmp:', e)
      }
    }
    dbUrl = `file:${tmpDbPath}`
  } else {
    dbUrl = "file:./dev.db"
  }
}

process.env.DATABASE_URL = dbUrl

const adapter = new PrismaLibSql({
  url: dbUrl,
  authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || "dummy-token",
})

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
