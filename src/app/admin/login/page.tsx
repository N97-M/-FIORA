'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic simulation for now (we'll add JWT API next)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('fiora_admin', 'true')
        router.push('/admin/dashboard')
    } else {
        setError('خطأ في اسم المستخدم أو كلمة المرور')
    }
  }

  return (
    <div className="login-container" style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a'
    }}>
      <div className="login-card" style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '50px',
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
            style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(219,192,126,0.1)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none'
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(219,192,126,0.1)',
                borderRadius: '8px',
                color: '#fff',
                outline: 'none'
            }}
          />
          {error && <p style={{ color: '#ff4444', fontSize: '14px' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
