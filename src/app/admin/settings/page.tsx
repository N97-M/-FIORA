import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function AdminSettings() {
  const settings = await prisma.settings.findFirst()

  return (
    <SettingsForm initialSettings={settings} />
  )
}
