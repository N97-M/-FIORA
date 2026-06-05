import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
      where: { isVisible: true },
      include: { category: true },
    })
    return NextResponse.json(items)
  } catch (err: any) {
    console.error('Failed to fetch gallery items:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title_ar, title_en, desc_ar, desc_en, categoryId, image_url, isFeatured } = body

    if (!categoryId || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const item = await prisma.galleryItem.create({
      data: { 
        title_ar: title_ar || '', 
        title_en: title_en || '', 
        desc_ar: desc_ar || '', 
        desc_en: desc_en || '', 
        categoryId, 
        image_url,
        isFeatured: isFeatured ?? false
      }
    })

    revalidatePath('/')
    revalidatePath('/admin/gallery')

    return NextResponse.json(item)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const item = await prisma.galleryItem.update({
      where: { id },
      data: updates,
    })
    revalidatePath('/')
    revalidatePath('/admin/gallery')
    return NextResponse.json(item)
  } catch (err: any) {
    console.error('Failed to update gallery item:', err)
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
