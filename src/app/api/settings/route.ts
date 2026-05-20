import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const settings = await prisma.settings.findFirst()

    // Handle Image Upload
    const file = formData.get('services_center_image') as File | null
    let finalImageUrl = settings?.services_center_image || null

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-services-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      
      const { supabaseAdmin } = await import('@/lib/supabase')
      const { error } = await supabaseAdmin.storage
        .from('uploads')
        .upload(`public/${filename}`, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error('Supabase upload error:', error)
        return NextResponse.json({ error: 'Failed to upload image: ' + error.message }, { status: 500 })
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('uploads')
        .getPublicUrl(`public/${filename}`)

      finalImageUrl = publicUrlData.publicUrl
    }

    const data = {
      whatsapp_number: formData.get('whatsapp_number') as string || '',
      whatsapp_msg_ar: formData.get('whatsapp_msg_ar') as string || '',
      whatsapp_msg_en: formData.get('whatsapp_msg_en') as string || '',
      tiktok_url: formData.get('tiktok_url') as string || '',
      instagram_url: formData.get('instagram_url') as string || '',
      snapchat_url: formData.get('snapchat_url') as string || '',
      status: formData.get('status') as string || 'AVAILABLE',
      services_center_image: finalImageUrl,
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
