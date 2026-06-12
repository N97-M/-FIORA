import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const settings = await prisma.settings.findFirst()

    const data = {
      whatsapp_number: formData.get('whatsapp_number') as string || '',
      whatsapp_msg_ar: formData.get('whatsapp_msg_ar') as string || '',
      whatsapp_msg_en: formData.get('whatsapp_msg_en') as string || '',
      tiktok_url: formData.get('tiktok_url') as string || '',
      instagram_url: formData.get('instagram_url') as string || '',
      location_url: formData.get('location_url') as string || '',
      status: formData.get('status') as string || 'AVAILABLE',
    }

    const updated = await prisma.settings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })

    revalidatePath('/admin/settings')
    revalidatePath('/')

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    console.error('Failed to update settings:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
