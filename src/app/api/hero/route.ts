import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const hero = await prisma.hero.findFirst()

    // Handle File Upload
    const file = formData.get('media_file') as File | null
    let finalImageUrl = hero?.image_url || '/hero-bg.jpg'

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
        return NextResponse.json({ error: 'Failed to upload hero media: ' + error.message }, { status: 500 })
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('uploads')
        .getPublicUrl(`public/${filename}`)

      finalImageUrl = publicUrlData.publicUrl
    }

    const data = {
      title_ar: formData.get('title_ar') as string || '',
      title_en: formData.get('title_en') as string || '',
      tagline_ar: formData.get('tagline_ar') as string || '',
      tagline_en: formData.get('tagline_en') as string || '',
      btn_gallery_ar: formData.get('btn_gallery_ar') as string || '',
      btn_gallery_en: formData.get('btn_gallery_en') as string || '',
      btn_contact_ar: formData.get('btn_contact_ar') as string || '',
      btn_contact_en: formData.get('btn_contact_en') as string || '',
      feat_1_ar: formData.get('feat_1_ar') as string || '',
      feat_1_en: formData.get('feat_1_en') as string || '',
      feat_2_ar: formData.get('feat_2_ar') as string || '',
      feat_2_en: formData.get('feat_2_en') as string || '',
      feat_3_ar: formData.get('feat_3_ar') as string || '',
      feat_3_en: formData.get('feat_3_en') as string || '',
      bg_type: formData.get('bg_type') as string || 'IMAGE',
      image_url: finalImageUrl,
      overlay_opacity: parseFloat(formData.get('overlay') as string) || 0.5
    }

    const updated = await prisma.hero.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (err: any) {
    console.error('Failed to update Hero:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
