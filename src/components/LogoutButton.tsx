'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('fiora_admin')
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      style={{ 
        background: 'rgba(255, 68, 68, 0.1)', 
        color: '#ff4444', 
        border: '1px solid rgba(255, 68, 68, 0.2)', 
        padding: '8px 16px', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        transition: '0.3s' 
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'
      }}
    >
      Logout
    </button>
  )
}
