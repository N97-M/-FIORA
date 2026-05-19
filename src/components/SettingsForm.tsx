'use client'

import { useState } from 'react'

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
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
      whatsapp_number: formData.get('whatsapp_number') as string,
      status: formData.get('status') as string,
      whatsapp_msg_ar: formData.get('whatsapp_msg_ar') as string,
      whatsapp_msg_en: formData.get('whatsapp_msg_en') as string,
      tiktok_url: formData.get('tiktok_url') as string,
      instagram_url: formData.get('instagram_url') as string,
      snapchat_url: formData.get('snapchat_url') as string,
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save connections')
      }

      setMessage('Connections saved successfully!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to save connections')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h3 style={{ marginBottom: '30px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Update Website Connections</h3>
      
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

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
        
        <div className="admin-grid-2">
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>WhatsApp Number</label>
                <input name="whatsapp_number" defaultValue={initialSettings?.whatsapp_number} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Business Status</label>
                <select name="status" defaultValue={initialSettings?.status || 'AVAILABLE'} required style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}>
                    <option value="AVAILABLE">Available (Website Open)</option>
                    <option value="BUSY">Busy</option>
                    <option value="CLOSED">Closed (Maintenance)</option>
                </select>
            </div>
        </div>

        {/* WhatsApp Default Messages */}
        <div className="admin-grid-2" style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#DBC07E', fontSize: '14px' }}>Default WhatsApp Message (AR)</label>
                <textarea name="whatsapp_msg_ar" defaultValue={initialSettings?.whatsapp_msg_ar} rows={3} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical', width: '100%', boxSizing: 'border-box' }} />
                <small style={{ color: '#888', fontSize: '11px' }}>This text is auto-filled when an Arabic user clicks contact.</small>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#DBC07E', fontSize: '14px' }}>Default WhatsApp Message (EN)</label>
                <textarea name="whatsapp_msg_en" defaultValue={initialSettings?.whatsapp_msg_en} rows={3} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', resize: 'vertical', width: '100%', boxSizing: 'border-box' }} />
                <small style={{ color: '#888', fontSize: '11px' }}>This text is auto-filled when an English user clicks contact.</small>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>TikTok Link</label>
                <input name="tiktok_url" defaultValue={initialSettings?.tiktok_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Instagram Link</label>
                <input name="instagram_url" defaultValue={initialSettings?.instagram_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
                <label style={{ color: '#aaa', fontSize: '14px' }}>Snapchat Link</label>
                <input name="snapchat_url" defaultValue={initialSettings?.snapchat_url} style={{ padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }} />
            </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            alignSelf: 'flex-start', 
            padding: '12px 40px', 
            background: loading ? '#666' : '#DBC07E', 
            color: '#000', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            transition: '0.3s' 
          }}
        >
          {loading ? 'Saving...' : 'Save Connections'}
        </button>
      </form>
    </>
  )
}
