import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('path')

  if (!filename) {
    return new NextResponse('File not found', { status: 404 })
  }

  const isProd = process.env.NODE_ENV === 'production'
  const filePath = isProd 
    ? path.join('/tmp', 'uploads', filename)
    : path.join(process.cwd(), 'public', 'uploads', filename)

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 })
  }

  const buffer = fs.readFileSync(filePath)
  
  const ext = path.extname(filename).toLowerCase()
  let contentType = 'application/octet-stream'
  if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
  else if (ext === '.png') contentType = 'image/png'
  else if (ext === '.webp') contentType = 'image/webp'
  else if (ext === '.gif') contentType = 'image/gif'
  else if (ext === '.mp4') contentType = 'video/mp4'
  else if (ext === '.webm') contentType = 'video/webm'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
