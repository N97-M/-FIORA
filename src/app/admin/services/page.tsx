import { prisma } from '@/lib/prisma'
import ServicesForm from '@/components/ServicesForm'

export const dynamic = 'force-dynamic'

export default async function AdminServices() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <ServicesForm initialServices={services} />
  )
}
