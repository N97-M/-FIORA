import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// GET all approved testimonials (visible)
export async function GET(request: NextRequest) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(testimonials);
  } catch (err: any) {
    console.error('Failed to fetch testimonials:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST a new testimonial (public submission). Starts as not visible (requires admin approval)
export async function POST(request: NextRequest) {
  try {
    const { client_name_en, client_name_ar, content_en, content_ar, rating } = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        client_name_en: client_name_en || '',
        client_name_ar: client_name_ar || '',
        content_en: content_en || '',
        content_ar: content_ar || '',
        rating: rating ?? 5,
        isVisible: false,
      },
    });
    // Revalidation for admin panel only
    revalidatePath('/admin/testimonials');
    return NextResponse.json(testimonial);
  } catch (err: any) {
    console.error('Failed to submit testimonial:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT to update (admin) – can also toggle isVisible for approval
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: updates,
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return NextResponse.json(testimonial);
  } catch (err: any) {
    console.error('Failed to update testimonial:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE testimonial (admin)
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Failed to delete testimonial:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
