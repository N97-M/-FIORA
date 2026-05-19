import { prisma } from '@/lib/prisma'
import NavbarForm from '@/components/NavbarForm'

export const dynamic = 'force-dynamic'

export default async function AdminNavbar() {
  const navbar = await prisma.navbar.findFirst()

  return (
    <NavbarForm initialNavbar={navbar} />
  )
}
