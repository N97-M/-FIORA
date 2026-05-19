import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title_ar, title_en, desc_ar, desc_en, categoryId, image_url } = body

    if (!title_ar || !title_en || !categoryId || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const item = await prisma.galleryItem.create({
      data: { title_ar, title_en, desc_ar: desc_ar || '', desc_en: desc_en || '', categoryId, image_url }
    })

    revalidatePath('/')
    revalidatePath('/admin/gallery')

    return NextResponse.json(item)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 })

    await prisma.galleryItem.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/gallery')
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
