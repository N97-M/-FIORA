import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

function hashPassword(plain: string): string {
  return crypto.createHash('sha256').update(plain + 'fiora_salt_2024').digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { action, email, username, displayName, password, role, id, currentActive } = await request.json()

    if (action === 'CREATE') {
      const trimmedEmail = email.trim().toLowerCase()
      const trimmedUsername = username.trim()
      const finalDisplayName = displayName.trim() || trimmedUsername

      if (!trimmedEmail || !trimmedUsername || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
      }

      const user = await prisma.user.create({
        data: {
          email: trimmedEmail,
          username: trimmedUsername,
          displayName: finalDisplayName,
          password: hashPassword(password),
          role: role || 'EDITOR',
          isActive: true,
        }
      })
      revalidatePath('/admin/admins')
      return NextResponse.json(user)
    }

    if (action === 'TOGGLE_ACTIVE') {
      if (!id) return NextResponse.json({ error: 'No id provided' }, { status: 400 })
      const updated = await prisma.user.update({
        where: { id },
        data: { isActive: !currentActive }
      })
      revalidatePath('/admin/admins')
      return NextResponse.json(updated)
    }

    if (action === 'CHANGE_ROLE') {
      if (!id || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
      const updated = await prisma.user.update({
        where: { id },
        data: { role }
      })
      revalidatePath('/admin/admins')
      return NextResponse.json(updated)
    }

    if (action === 'RESET_PASSWORD') {
      if (!id || !password || password.length < 6) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
      }
      const updated = await prisma.user.update({
        where: { id },
        data: { password: hashPassword(password) }
      })
      revalidatePath('/admin/admins')
      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    console.error('Admins API POST error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'No id provided' }, { status: 400 })

    // Never delete the last superadmin
    const superAdmins = await prisma.user.count({ where: { role: 'SUPERADMIN' } })
    const target = await prisma.user.findUnique({ where: { id } })
    if (target?.role === 'SUPERADMIN' && superAdmins <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last superadmin' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin/admins')
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Admins API DELETE error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
