'use client'

import { useState } from 'react'

interface User {
  id: string
  email: string
  username: string
  displayName: string
  role: string
  isActive: boolean
  createdAt: string
}

const ROLES = [
  { value: 'SUPERADMIN', label: 'Super Admin', desc: 'Full access to everything', color: '#DBC07E' },
  { value: 'EDITOR',     label: 'Editor',      desc: 'Can edit content only',    color: '#60a5fa' },
  { value: 'GALLERY_MANAGER', label: 'Gallery Manager', desc: 'Can manage gallery only', color: '#34d399' },
]

export default function AdminsForm({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const roleColor = (role: string) => ROLES.find(r => r.value === role)?.color ?? '#aaa'
  const roleLabel = (role: string) => ROLES.find(r => r.value === role)?.label ?? role

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      action: 'CREATE',
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      displayName: formData.get('displayName') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as string,
    }

    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user')
      }

      setUsers(prev => [...prev, data])
      setMessage('Admin account created successfully!')
      form.reset()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to create user')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleActive(id: string, currentActive: boolean) {
    setMessage('')
    setError('')
    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TOGGLE_ACTIVE', id, currentActive })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update status')

      setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !currentActive } : u))
      setMessage(`User status updated successfully!`)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  async function handleChangeRole(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const id = formData.get('id') as string
    const role = formData.get('role') as string

    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'CHANGE_ROLE', id, role })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update role')

      setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
      setMessage('Role updated successfully!')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const id = formData.get('id') as string
    const password = formData.get('password') as string

    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'RESET_PASSWORD', id, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to reset password')

      setMessage('Password reset successfully!')
      form.reset()
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this admin account?')) return
    setMessage('')
    setError('')

    try {
      const res = await fetch(`/api/admins?id=${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete user')

      setUsers(prev => prev.filter(u => u.id !== id))
      setMessage('Admin account deleted successfully!')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

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

      {message && (
        <div style={{ padding: '15px', background: 'rgba(40, 167, 69, 0.1)', border: '1px solid rgba(40, 167, 69, 0.3)', color: '#28a745', borderRadius: '8px', fontWeight: 'bold' }}>
          <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#dc3545', borderRadius: '8px', fontWeight: 'bold' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i> {error}
        </div>
      )}

      {/* ── Stats Row ── */}
      <div className="admin-grid-3">
        {[
          { label: 'Total Admins',  value: users.length,                                    icon: 'fa-users',         color: '#DBC07E' },
          { label: 'Active',        value: users.filter((u: User) => u.isActive).length,             icon: 'fa-check-circle',  color: '#34d399' },
          { label: 'Super Admins',  value: users.filter((u: User) => u.role === 'SUPERADMIN').length, icon: 'fa-crown',         color: '#f59e0b' },
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

        <form onSubmit={handleCreate} style={{ display: 'grid', gap: '20px' }}>
          <div className="admin-grid-2">
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
            <div className="admin-grid-3">
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
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '12px 36px', 
                background: loading ? '#666' : 'linear-gradient(135deg, #DBC07E, #c9a85c)', 
                color: '#000', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: '700', 
                fontSize: '14px', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <i className="fas fa-plus"></i> {loading ? 'Creating...' : 'Create Admin Account'}
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

          {users.map((user: User) => (
            <div key={user.id} className="admin-list-item" style={{
              background: '#0d0d0d',
              border: `1px solid ${user.isActive ? '#1e2e1e' : '#2e1e1e'}`,
              borderRadius: '12px',
              padding: '20px',
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
              <div className="admin-flex-actions">
                {/* Change Role */}
                <form onSubmit={handleChangeRole} style={{ display: 'flex', gap: '8px' }}>
                  <input type="hidden" name="id" value={user.id} />
                  <select name="role" defaultValue={user.role} style={{ ...inputStyle, flex: 1, padding: '8px 10px', fontSize: '13px' }}>
                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <button type="submit" style={{ padding: '8px 14px', background: '#1a2a1a', border: '1px solid #2a3a2a', color: '#34d399', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    Update Role
                  </button>
                </form>

                {/* Reset Password */}
                <form onSubmit={handleResetPassword} style={{ display: 'flex', gap: '8px' }}>
                  <input type="hidden" name="id" value={user.id} />
                  <input type="password" name="password" placeholder="New password..." minLength={6} style={{ ...inputStyle, flex: 1, padding: '8px 10px', fontSize: '13px' }} />
                  <button type="submit" style={{ padding: '8px 14px', background: '#1a1a2a', border: '1px solid #2a2a3a', color: '#60a5fa', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    Reset
                  </button>
                </form>

                {/* Suspend / Delete */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleToggleActive(user.id, user.isActive)} 
                    style={{ flex: 1, padding: '8px 14px', background: user.isActive ? '#2a1a1a' : '#1a2a1a', border: `1px solid ${user.isActive ? '#3a2a2a' : '#2a3a2a'}`, color: user.isActive ? '#f87171' : '#34d399', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    <i className={`fas ${user.isActive ? 'fa-ban' : 'fa-check'}`}></i> {user.isActive ? 'Suspend' : 'Reactivate'}
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    style={{ padding: '8px 14px', background: '#2a1a1a', border: '1px solid #3a1a1a', color: '#ff4444', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
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
          <ul style={{ color: '#888', fontSize: '13px', margin: 0, paddingLeft: '18px', letterSpacing: '0.01em', lineHeight: '1.8' }}>
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
