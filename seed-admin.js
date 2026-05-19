const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

const prisma = new PrismaClient()

function hashPassword(plain) {
  return crypto.createHash('sha256').update(plain + 'fiora_salt_2024').digest('hex')
}

async function main() {
  const email = 'monzerhafiz83@gmail.com'
  const username = 'monzerhafiz83'
  const password = hashPassword('monzerhafiz999')

  await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: 'SUPERADMIN',
      isActive: true,
    },
    create: {
      email,
      username,
      displayName: 'Monzer Hafiz',
      password,
      role: 'SUPERADMIN',
      isActive: true,
    }
  })

  console.log('Successfully seeded admin user: ' + email)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
