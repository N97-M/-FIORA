import { prisma } from '@/lib/prisma'
import AboutForm from '@/components/AboutForm'

export const dynamic = 'force-dynamic'

export default async function AdminAbout() {
  const about = await prisma.about.findFirst()

  return (
    <AboutForm initialAbout={about} />
  )
}
