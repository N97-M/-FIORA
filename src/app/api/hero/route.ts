import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const hero = await prisma.hero.findFirst()
    const finalImageUrl = body.image_url || hero?.image_url || '/hero-bg.jpg'

    const data = {
      title_ar: body.title_ar || '',
      title_en: body.title_en || '',
      tagline_ar: body.tagline_ar || '',
      tagline_en: body.tagline_en || '',
      btn_gallery_ar: body.btn_gallery_ar || '',
      btn_gallery_en: body.btn_gallery_en || '',
      btn_contact_ar: body.btn_contact_ar || '',
      btn_contact_en: body.btn_contact_en || '',
      feat_1_ar: body.feat_1_ar || '',
      feat_1_en: body.feat_1_en || '',
      feat_2_ar: body.feat_2_ar || '',
      feat_2_en: body.feat_2_en || '',
      feat_3_ar: body.feat_3_ar || '',
      feat_3_en: body.feat_3_en || '',
      bg_type: body.bg_type || 'IMAGE',
      image_url: finalImageUrl,
      overlay_opacity: parseFloat(body.overlay) || 0.5
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
