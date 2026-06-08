'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ThemeForm({ initialTheme }: { initialTheme: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const [form, setForm] = useState({
    // Global
    bg_website: initialTheme?.bg_website || '#ffffff',
    text_primary: initialTheme?.text_primary || '#000000',
    text_secondary: initialTheme?.text_secondary || '#555555',
    accent_gold: initialTheme?.accent_gold || '#DBC07E',

    // Header
    bg_header: initialTheme?.bg_header || 'transparent',
    text_header: initialTheme?.text_header || '#000000',
    text_header_mobile: initialTheme?.text_header_mobile || initialTheme?.text_header || '#000000',
    text_header_hover: initialTheme?.text_header_hover || '#DBC07E',

    // Footer
    bg_footer: initialTheme?.bg_footer || '#0a0a0a',
    text_footer: initialTheme?.text_footer || '#ffffff',
    link_footer: initialTheme?.link_footer || 'rgba(255,255,255,0.7)',
    accent_footer: initialTheme?.accent_footer || '#DBC07E',

    // Cards
    bg_card: initialTheme?.bg_card || '#FDFBF7',
    text_card: initialTheme?.text_card || '#000000',

    // Badges
    bg_badge: initialTheme?.bg_badge || '#222222',
    text_badge: initialTheme?.text_badge || '#DBC07E',

    // Buttons
    bg_button: initialTheme?.bg_button || '#000000',
    text_button: initialTheme?.text_button || '#ffffff',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setMessage('Theme updated successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setMessage('Failed to update theme')
      }
    } catch (err) {
      setMessage('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    padding: '12px',
    background: '#111',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '8px',
    width: '100%',
    fontFamily: 'monospace'
  }

  const ColorInput = ({ label, name }: { label: string, name: keyof typeof form }) => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type={form[name].startsWith('rgba') || form[name] === 'transparent' ? 'text' : 'color'}
          name={name}
          value={form[name]}
          onChange={handleChange}
          style={{ height: '45px', width: '60px', padding: 0, border: 'none', background: 'transparent' }}
        />
        <input
          type="text"
          name={name}
          value={form[name]}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
    </div>
  )

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '12px', border: '1px solid #222' }}>
      <h4 style={{ color: '#DBC07E', marginBottom: '20px', fontSize: '18px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{title}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {children}
      </div>
    </div>
  )

  return (
    <>
      <h3 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '28px' }}>
        Theme & Colors
      </h3>

      {message && (
        <div style={{ padding: '15px', background: 'rgba(52,211,153,0.1)', border: '1px solid #34d39944', color: '#34d399', borderRadius: '8px', marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>

        <Section title="Global Colors">
          <ColorInput label="Website Background" name="bg_website" />
          <ColorInput label="Primary Text Color" name="text_primary" />
          <ColorInput label="Secondary/Muted Text Color" name="text_secondary" />
          <ColorInput label="Accent Gold Color" name="accent_gold" />
        </Section>

        <Section title="Header/Navigation">
          <ColorInput label="Header Background" name="bg_header" />
          <ColorInput label="Header Link Color (Desktop)" name="text_header" />
          <ColorInput label="Header Link Color (Mobile)" name="text_header_mobile" />
          <ColorInput label="Header Hover Color" name="text_header_hover" />
        </Section>

        <Section title="Cards (Services, Projects, Reviews)">
          <ColorInput label="Card Background Color" name="bg_card" />
          <ColorInput label="Card Text Color" name="text_card" />
        </Section>

        <Section title="Footer">
          <ColorInput label="Footer Background" name="bg_footer" />
          <ColorInput label="Footer Text Color" name="text_footer" />
          <ColorInput label="Footer Link Color" name="link_footer" />
          <ColorInput label="Footer Accent Color" name="accent_footer" />
        </Section>

        <Section title="Buttons & Badges">
          <ColorInput label="Button Background" name="bg_button" />
          <ColorInput label="Button Text Color" name="text_button" />
          <ColorInput label="Badge Background (Categories)" name="bg_badge" />
          <ColorInput label="Badge Text Color" name="text_badge" />
        </Section>

        <button
          type="submit"
          disabled={loading}
          style={{
            justifySelf: 'start',
            padding: '15px 50px',
            background: loading ? '#666' : '#DBC07E',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Saving...' : 'Save Theme Configuration'}
        </button>
      </form>
    </>
  )
}
