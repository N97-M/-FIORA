import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const about = await prisma.about.findFirst()

    // Handle Image Upload
    const file = formData.get('media_file') as File | null
    let finalImageUrl = about?.image_url || '/about-img.jpg'

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      
      const { supabaseAdmin } = await import('@/lib/supabase')
      const { error } = await supabaseAdmin.storage
        .from('uploads')
        .upload(`public/${filename}`, buffer, {
          contentType: file.type,
          upsert: false
        })

      if (error) {
        console.error('Supabase upload error:', error)
        return NextResponse.json({ error: 'Failed to upload about image: ' + error.message }, { status: 500 })
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('uploads')
        .getPublicUrl(`public/${filename}`)

      finalImageUrl = publicUrlData.publicUrl
    }

    const data = {
      title_ar: formData.get('title_ar') as string || '',
      title_en: formData.get('title_en') as string || '',
      content_ar: formData.get('content_ar') as string || '',
      content_en: formData.get('content_en') as string || '',
      image_url: finalImageUrl
    }

    const updated = await prisma.about.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })

    // Update the 4 values
    const valueEn0 = formData.get('value_en_0') as string
    const valueAr0 = formData.get('value_ar_0') as string
    if (valueEn0 && valueAr0) {
      await prisma.value.deleteMany({ where: { aboutId: 1 } })
      await prisma.value.createMany({
        data: [
          { aboutId: 1, text_en: formData.get('value_en_0') as string || '', text_ar: formData.get('value_ar_0') as string || '' },
          { aboutId: 1, text_en: formData.get('value_en_1') as string || '', text_ar: formData.get('value_ar_1') as string || '' },
          { aboutId: 1, text_en: formData.get('value_en_2') as string || '', text_ar: formData.get('value_ar_2') as string || '' },
          { aboutId: 1, text_en: formData.get('value_en_3') as string || '', text_ar: formData.get('value_ar_3') as string || '' },
        ]
      })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    console.error('Failed to update About:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
