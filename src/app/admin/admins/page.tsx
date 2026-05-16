import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// Simple but secure hash using Node's built-in crypto (no bcrypt dependency needed)
function hashPassword(plain: string): string {
  return crypto.createHash('sha256').update(plain + 'fiora_salt_2024').digest('hex')
}

const ROLES = [
  { value: 'SUPERADMIN', label: 'Super Admin', desc: 'Full access to everything', color: '#DBC07E' },
  { value: 'EDITOR',     label: 'Editor',      desc: 'Can edit content only',    color: '#60a5fa' },
  { value: 'GALLERY_MANAGER', label: 'Gallery Manager', desc: 'Can manage gallery only', color: '#34d399' },
]

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })

  // ── CREATE ──────────────────────────────────────────────────────────────────
  async function createAdmin(formData: FormData) {
    'use server'
    const email    = (formData.get('email')    as string).trim().toLowerCase()
    const username = (formData.get('username') as string).trim()
    const displayName = (formData.get('displayName') as string).trim() || username
    const password = formData.get('password') as string
    const role     = formData.get('role')     as string

    if (!email || !username || !password) return

    await prisma.user.create({
      data: {
        email,
        username,
        displayName,
        password: hashPassword(password),
        role,
        isActive: true,
      }
    })
    revalidatePath('/admin/admins')
  }

  // ── TOGGLE ACTIVE ────────────────────────────────────────────────────────────
  async function toggleActive(id: string, current: boolean) {
    'use server'
    await prisma.user.update({ where: { id }, data: { isActive: !current } })
    revalidatePath('/admin/admins')
  }

  // ── CHANGE ROLE ──────────────────────────────────────────────────────────────
  async function changeRole(formData: FormData) {
    'use server'
    const id   = formData.get('id')   as string
    const role = formData.get('role') as string
    await prisma.user.update({ where: { id }, data: { role } })
    revalidatePath('/admin/admins')
  }

  // ── RESET PASSWORD ────────────────────────────────────────────────────────────
  async function resetPassword(formData: FormData) {
    'use server'
    const id       = formData.get('id')       as string
    const password = formData.get('password') as string
    if (!password || password.length < 6) return
    await prisma.user.update({ where: { id }, data: { password: hashPassword(password) } })
    revalidatePath('/admin/admins')
  }

  // ── DELETE ───────────────────────────────────────────────────────────────────
  async function deleteAdmin(id: string) {
    'use server'
    // Never delete the last superadmin
    const superAdmins = await prisma.user.count({ where: { role: 'SUPERADMIN' } })
    const target = await prisma.user.findUnique({ where: { id } })
    if (target?.role === 'SUPERADMIN' && superAdmins <= 1) return
    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin/admins')
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const roleColor = (role: string) => ROLES.find(r => r.value === role)?.color ?? '#aaa'
  const roleLabel = (role: string) => ROLES.find(r => r.value === role)?.label ?? role

  const inputStyle: React.CSSProperties = {
    padding: '10px 14px',
    background: '#0d0d0d',
    border: '1px solid #2a2a2a',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
  }

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '28px',
  }

  return (
    <div style={{ display: 'grid', gap: '40px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg,#DBC07E22,#DBC07E44)', display: 'grid', placeItems: 'center', border: '1px solid #DBC07E33' }}>
          <i className="fas fa-shield-alt" style={{ color: '#DBC07E', fontSize: '22px' }}></i>
        </div>
        <div>
          <h2 style={{ margin: 0, color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '26px' }}>Admin Access Management</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Manage who can log into this dashboard and their permissions.</p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Admins',  value: users.length,                                    icon: 'fa-users',         color: '#DBC07E' },
          { label: 'Active',        value: users.filter(u => u.isActive).length,             icon: 'fa-check-circle',  color: '#34d399' },
          { label: 'Super Admins',  value: users.filter(u => u.role === 'SUPERADMIN').length, icon: 'fa-crown',         color: '#f59e0b' },
        ].map(stat => (
          <div key={stat.label} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}18`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <i className={`fas ${stat.icon}`} style={{ color: stat.color, fontSize: '18px' }}></i>
            </div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#777', marginTop: '4px' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add New Admin ── */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 24px', color: '#DBC07E', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fas fa-user-plus" style={{ fontSize: '16px' }}></i>
          Add New Admin Account
        </h3>

        <form action={createAdmin} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Display Name</label>
              <input name="displayName" placeholder="e.g. Mohamed Ali" style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Username</label>
              <input name="username" placeholder="e.g. m.ali" required style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
              <input name="email" type="email" placeholder="admin@example.com" required style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
              <input name="password" type="password" placeholder="Min 6 characters" required minLength={6} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Permission Level</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {ROLES.map(role => (
                <label key={role.value} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="role" value={role.value} defaultChecked={role.value === 'EDITOR'} style={{ marginTop: '2px', accentColor: role.color }} />
                  <div>
                    <div style={{ color: role.color, fontWeight: '600', fontSize: '14px' }}>{role.label}</div>
                    <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>{role.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button type="submit" style={{ padding: '12px 36px', background: 'linear-gradient(135deg, #DBC07E, #c9a85c)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-plus"></i> Create Admin Account
            </button>
          </div>
        </form>
      </div>

      {/* ── Existing Admins ── */}
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 24px', color: '#DBC07E', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fas fa-users-cog" style={{ fontSize: '16px' }}></i>
          Existing Admin Accounts ({users.length})
        </h3>

        <div style={{ display: 'grid', gap: '16px' }}>
          {users.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>
              <i className="fas fa-user-slash" style={{ fontSize: '36px', marginBottom: '16px', display: 'block' }}></i>
              No admin accounts yet. Create the first one above.
            </div>
          )}

          {users.map(user => (
            <div key={user.id} style={{
              background: '#0d0d0d',
              border: `1px solid ${user.isActive ? '#1e2e1e' : '#2e1e1e'}`,
              borderRadius: '12px',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '20px',
              alignItems: 'start',
              opacity: user.isActive ? 1 : 0.6,
            }}>
              {/* Left: Info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                {/* Avatar */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: `${roleColor(user.role)}22`,
                  border: `1px solid ${roleColor(user.role)}44`,
                  display: 'grid', placeItems: 'center',
                  fontSize: '20px', fontWeight: '700', color: roleColor(user.role),
                }}>
                  {(user.displayName ?? user.username ?? '?')[0]?.toUpperCase()}
                </div>

                <div style={{ display: 'grid', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>{user.displayName ?? user.username}</span>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: `${roleColor(user.role)}22`, color: roleColor(user.role), border: `1px solid ${roleColor(user.role)}44`, fontWeight: '600' }}>
                      {roleLabel(user.role)}
                    </span>
                    {!user.isActive && (
                      <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: '#ff444422', color: '#ff6666', border: '1px solid #ff444444' }}>SUSPENDED</span>
                    )}
                  </div>
                  <div style={{ color: '#666', fontSize: '13px' }}>@{user.username} &nbsp;·&nbsp; {user.email}</div>
                  <div style={{ color: '#444', fontSize: '12px' }}>
                    Created: {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '260px' }}>
                {/* Change Role */}
                <form action={changeRole} style={{ display: 'flex', gap: '8px' }}>
                  <input type="hidden" name="id" value={user.id} />
                  <select name="role" defaultValue={user.role} style={{ ...inputStyle, flex: 1, padding: '8px 10px', fontSize: '13px' }}>
                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <button type="submit" style={{ padding: '8px 14px', background: '#1a2a1a', border: '1px solid #2a3a2a', color: '#34d399', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    Update Role
                  </button>
                </form>

                {/* Reset Password */}
                <form action={resetPassword} style={{ display: 'flex', gap: '8px' }}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="password" name="password" placeholder="New password..." minLength={6} style={{ ...inputStyle, flex: 1, padding: '8px 10px', fontSize: '13px' }} />
                  <button type="submit" style={{ padding: '8px 14px', background: '#1a1a2a', border: '1px solid #2a2a3a', color: '#60a5fa', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    Reset
                  </button>
                </form>

                {/* Suspend / Delete */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <form action={toggleActive.bind(null, user.id, user.isActive)} style={{ flex: 1 }}>
                    <button type="submit" style={{ width: '100%', padding: '8px 14px', background: user.isActive ? '#2a1a1a' : '#1a2a1a', border: `1px solid ${user.isActive ? '#3a2a2a' : '#2a3a2a'}`, color: user.isActive ? '#f87171' : '#34d399', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                      <i className={`fas ${user.isActive ? 'fa-ban' : 'fa-check'}`}></i> {user.isActive ? 'Suspend' : 'Reactivate'}
                    </button>
                  </form>
                  <form action={deleteAdmin.bind(null, user.id)}>
                    <button type="submit" style={{ padding: '8px 14px', background: '#2a1a1a', border: '1px solid #3a1a1a', color: '#ff4444', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Security Notes ── */}
      <div style={{ background: 'rgba(219,192,126,0.05)', border: '1px solid rgba(219,192,126,0.15)', borderRadius: '12px', padding: '20px', display: 'flex', gap: '14px' }}>
        <i className="fas fa-info-circle" style={{ color: '#DBC07E', fontSize: '18px', flexShrink: 0, marginTop: '2px' }}></i>
        <div>
          <div style={{ color: '#DBC07E', fontWeight: '600', marginBottom: '8px' }}>Security Notes</div>
          <ul style={{ color: '#888', fontSize: '13px', margin: 0, paddingLeft: '18px', lineHeight: '1.8' }}>
            <li>Passwords are stored as one-way SHA-256 hashes — they cannot be recovered, only reset.</li>
            <li>The last Super Admin account cannot be deleted.</li>
            <li>Suspended accounts retain their data but cannot log in.</li>
            <li>Roles: <span style={{ color: '#DBC07E' }}>Super Admin</span> = full access, <span style={{ color: '#60a5fa' }}>Editor</span> = content only, <span style={{ color: '#34d399' }}>Gallery Manager</span> = gallery only.</li>
          </ul>
        </div>
      </div>

    </div>
  )
}
