'use client'

import { useEffect, useState } from 'react'

export default function MaintenanceScreen({ theme }: { theme: any }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: theme.bg_website || '#ffffff', color: theme.text_primary || '#000000', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.7, fontWeight: '500' }}>
          {time}
        </div>
        <i className="fas fa-tools" style={{ fontSize: '3rem', color: theme.accent_gold || '#DBC07E', marginBottom: '1.5rem' }}></i>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>سوف نعود قريباً</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 'normal', opacity: 0.8 }}>We will be back soon</h2>
      </div>
    </main>
  )
}
