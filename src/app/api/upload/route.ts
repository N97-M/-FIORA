import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${Date.now()}-${safeName}`

    // Check if Supabase URL is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
       console.error('Supabase is not configured.')
       return NextResponse.json({ error: 'Storage backend not configured' }, { status: 500 })
    }

    const { data, error } = await supabaseAdmin.storage
      .from('uploads')
      .upload(`public/${filename}`, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('uploads')
      .getPublicUrl(`public/${filename}`)

    return NextResponse.json({ url: publicUrlData.publicUrl })
  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Increase request body size limit for uploads (up to 20 MB)
export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '20mb'
  }
}
