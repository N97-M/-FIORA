import { prisma } from '@/lib/prisma'
import ThemeForm from './ThemeForm'

export const dynamic = 'force-dynamic'

export default async function ThemeAdminPage() {
  const theme = await prisma.theme.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  })

  return <ThemeForm initialTheme={theme} />
}
