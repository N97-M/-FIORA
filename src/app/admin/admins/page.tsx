import { prisma } from '@/lib/prisma'
import AdminsForm from '@/components/AdminsForm'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ 
    orderBy: { createdAt: 'asc' } 
  })

  // Format Date for client components to prevent timezone/serialization mismatches
  const formattedUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString()
  }))

  return (
    <AdminsForm initialUsers={formattedUsers} />
  )
}
