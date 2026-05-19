import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { whatsapp_number, whatsapp_msg_ar, whatsapp_msg_en, tiktok_url, instagram_url, snapchat_url, status } = await request.json()

    const data = {
      whatsapp_number: whatsapp_number || '',
      whatsapp_msg_ar: whatsapp_msg_ar || '',
      whatsapp_msg_en: whatsapp_msg_en || '',
      tiktok_url: tiktok_url || '',
      instagram_url: instagram_url || '',
      snapchat_url: snapchat_url || '',
      status: status || 'AVAILABLE',
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
