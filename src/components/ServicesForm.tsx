'use client'

import { useState } from 'react'

interface Service {
  id: string
  title_ar: string
  title_en: string
  desc_ar: string
  desc_en: string
  icon: string
}

export default function ServicesForm({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleAddService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      title_ar: formData.get('title_ar') as string,
      title_en: formData.get('title_en') as string,
      desc_ar: formData.get('desc_ar') as string,
      desc_en: formData.get('desc_en') as string,
      icon: formData.get('icon') as string,
    }

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add service')
      }

      setServices(prev => [...prev, data])
      setMessage('Service added successfully!')
      form.reset()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to add service')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete service')
      }

      setServices(prev => prev.filter(s => s.id !== id))
      setMessage('Service deleted successfully!')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to delete service')
    }
  }

  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '24px' }}>Add New Service</h3>
        
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

        <form onSubmit={handleAddService} style={{ display: 'grid', gap: '20px' }}>
          
          <div className="admin-grid-2">
            {/* Arabic Fields */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E', fontSize: '16px' }}>Arabic Content</h4>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Title (AR)</label>
                  <input name="title_ar" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Description (AR)</label>
                  <textarea name="desc_ar" rows={2} required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                </div>
            </div>

            {/* English Fields */}
            <div style={{ display: 'grid', gap: '15px', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', border: '1px solid #222' }}>
                <h4 style={{ color: '#DBC07E', fontSize: '16px' }}>English Content</h4>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Title (EN)</label>
                  <input name="title_en" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gap: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#aaa' }}>Description (EN)</label>
                  <textarea name="desc_en" rows={2} required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px', alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: '5px' }}>
              <label style={{ fontSize: '12px', color: '#aaa' }}>Icon (FontAwesome Class)</label>
              <input name="icon" defaultValue="fas fa-star" required style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '10px 35px', 
                background: loading ? '#666' : '#DBC07E', 
                color: '#000', 
                border: 'none', 
                borderRadius: '4px', 
                fontWeight: 'bold', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                height: '40px' 
              }}
            >
              {loading ? 'Adding...' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {services.map((service: Service) => (
          <div key={service.id} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <i className={service.icon} style={{ fontSize: '28px', color: '#DBC07E', marginTop: '5px' }}></i>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>AR: {service.title_ar}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>{service.desc_ar}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>EN: {service.title_en}</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>{service.desc_en}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(service.id)} 
              style={{ 
                background: 'rgba(255, 68, 68, 0.1)', 
                border: '1px solid rgba(255, 68, 68, 0.2)', 
                color: '#ff4444', 
                cursor: 'pointer', 
                padding: '10px 15px', 
                borderRadius: '6px', 
                transition: '0.3s' 
              }}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
