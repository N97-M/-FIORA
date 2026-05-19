'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('fiora_admin', 'true') // Keep for any client-side checks if needed
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'خطأ في اسم المستخدم أو كلمة المرور')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '20px'
    }}>
      <div className="login-card" style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '50px 30px',
          borderRadius: '20px',
          border: '1px solid rgba(219, 192, 126, 0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
      }}>
        <img src="/logo.png" alt="FIORA" style={{ width: '120px', marginBottom: '30px' }} />
        <h2 style={{ color: '#DBC07E', marginBottom: '30px', fontFamily: 'Playfair Display' }}>Admin Login</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(219,192,126,0.1)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                width: '100%'
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(219,192,126,0.1)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none',
                width: '100%'
            }}
          />
          {error && <p style={{ color: '#ff4444', fontSize: '14px', margin: 0 }}>{error}</p>}
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
