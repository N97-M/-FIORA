import { prisma } from '@/lib/prisma'
import HeroForm from '@/components/HeroForm'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const hero = await prisma.hero.findFirst()

  return (
    <HeroForm initialHero={hero} />
  )
}
