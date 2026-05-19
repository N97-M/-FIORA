import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

function hashPassword(plain: string): string {
  return crypto.createHash('sha256').update(plain + 'fiora_salt_2024').digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Fallback static auth for initial setup or generic admin access
    if (username === 'admin' && password === 'admin123') {
        const response = NextResponse.json({ success: true })
        response.cookies.set('fiora_session', 'authenticated', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
        return response
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.trim() },
          { email: username.trim().toLowerCase() }
        ],
        isActive: true
      }
    })

    if (!user || user.password !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true, role: user.role })
    response.cookies.set('fiora_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return response

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
