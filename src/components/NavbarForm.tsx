'use client'

import { useState } from 'react'

export default function NavbarForm({ initialNavbar }: { initialNavbar: any }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      nav_home_ar: formData.get('nav_home_ar') as string,
      nav_home_en: formData.get('nav_home_en') as string,
      nav_about_ar: formData.get('nav_about_ar') as string,
      nav_about_en: formData.get('nav_about_en') as string,
      nav_services_ar: formData.get('nav_services_ar') as string,
      nav_services_en: formData.get('nav_services_en') as string,
      nav_gallery_ar: formData.get('nav_gallery_ar') as string,
      nav_gallery_en: formData.get('nav_gallery_en') as string,
      nav_how_ar: formData.get('nav_how_ar') as string,
      nav_how_en: formData.get('nav_how_en') as string,
      nav_contact_ar: formData.get('nav_contact_ar') as string,
      nav_contact_en: formData.get('nav_contact_en') as string,
    }

    try {
      const res = await fetch('/api/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save navigation')
      }

      setMessage('Navigation links saved successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to save navigation')
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ label, name, defaultValue }: any) => (
    <div style={{ display: 'grid', gap: '8px' }}>
      <label style={{ color: '#aaa', fontSize: '13px' }}>{label}</label>
      <input name={name} defaultValue={defaultValue} style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }} />
    </div>
  )

  return (
    <>
      <h2 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display' }}>Manage Top Navigation</h2>
      
      {message && (
        <div style={{ padding: '15px', background: 'rgba(40, 167, 69, 0.1)', border: '1px solid rgba(40, 167, 69, 0.3)', color: '#28a745', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold' }}>
          <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> {message}
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#dc3545', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>Arabic Menu Links</h4>
            <InputField label="Home" name="nav_home_ar" defaultValue={initialNavbar?.nav_home_ar} />
            <InputField label="About Us" name="nav_about_ar" defaultValue={initialNavbar?.nav_about_ar} />
            <InputField label="Services" name="nav_services_ar" defaultValue={initialNavbar?.nav_services_ar} />
            <InputField label="Our Work" name="nav_gallery_ar" defaultValue={initialNavbar?.nav_gallery_ar} />
            <InputField label="How to Rent" name="nav_how_ar" defaultValue={initialNavbar?.nav_how_ar} />
            <InputField label="Contact Us" name="nav_contact_ar" defaultValue={initialNavbar?.nav_contact_ar} />
          </div>

          <div style={{ display: 'grid', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <h4 style={{ color: '#DBC07E' }}>English Menu Links</h4>
            <InputField label="Home" name="nav_home_en" defaultValue={initialNavbar?.nav_home_en} />
            <InputField label="About Us" name="nav_about_en" defaultValue={initialNavbar?.nav_about_en} />
            <InputField label="Services" name="nav_services_en" defaultValue={initialNavbar?.nav_services_en} />
            <InputField label="Our Work" name="nav_gallery_en" defaultValue={initialNavbar?.nav_gallery_en} />
            <InputField label="How to Rent" name="nav_how_en" defaultValue={initialNavbar?.nav_how_en} />
            <InputField label="Contact Us" name="nav_contact_en" defaultValue={initialNavbar?.nav_contact_en} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            justifySelf: 'start', 
            padding: '12px 50px', 
            background: loading ? '#666' : '#DBC07E', 
            color: '#000', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            transition: '0.3s' 
          }}
        >
          {loading ? 'Saving...' : 'Save Navigation'}
        </button>
      </form>
    </>
  )
}
