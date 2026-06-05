'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  client_name_en: string;
  client_name_ar: string;
  content_en: string;
  content_ar: string;
  rating: number;
  isVisible: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});
  const [isAdding, setIsAdding] = useState(false);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials', { cache: 'no-store' });
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const startEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ ...t });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditing(null);
    setForm({ rating: 5, isVisible: true });
    setIsAdding(true);
  };

  const submitUpdate = async () => {
    if (isAdding) {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, isVisible: form.isVisible ?? true }),
      });
      const newT = await res.json();
      if (form.isVisible) {
        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: newT.id, isVisible: true }),
        });
      }
    } else {
      if (!editing?.id) return;
      await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    }
    setEditing(null);
    setIsAdding(false);
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    if(!confirm("Are you sure you want to delete this testimonial?")) return;
    await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  const approveTestimonial = async (id: string) => {
    await fetch('/api/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isVisible: true }),
    });
    fetchTestimonials();
  };

  const toggleVisibility = async (t: Testimonial) => {
    await fetch('/api/testimonials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, isVisible: !t.isVisible }),
    });
    fetchTestimonials();
  };

  const inputStyle = {
    padding: '12px',
    background: '#111',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '8px',
    width: '100%',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#DBC07E', fontFamily: 'Playfair Display', fontSize: '28px', margin: 0 }}>
            Testimonials & Reviews
          </h2>
          <p style={{ color: '#888', margin: '5px 0 0 0', fontSize: '14px' }}>Manage client reviews and website approvals.</p>
        </div>
        <button 
          onClick={startAdd} 
          style={{ background: '#DBC07E', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>+ Add Review Manually</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {testimonials.map((t) => (
          <div key={t.id} style={{ 
            background: 'rgba(255,255,255,0.02)', 
            border: t.isVisible ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(245, 158, 11, 0.4)', 
            borderRadius: '12px', 
            padding: '20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
              {t.isVisible ? (
                <span style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                  ✓ Approved
                </span>
              ) : (
                <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  ⧗ Pending Review
                </span>
              )}
            </div>

            <div style={{ color: '#DBC07E', fontSize: '16px', marginBottom: '15px' }}>
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </div>

            <h4 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '18px' }}>{t.client_name_en || t.client_name_ar}</h4>
            
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6', flexGrow: 1, margin: '0 0 20px 0', fontStyle: 'italic' }}>
              "{t.content_en || t.content_ar}"
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              {!t.isVisible ? (
                <button 
                  onClick={() => approveTestimonial(t.id)} 
                  style={{ flex: 1, background: '#34d399', color: '#000', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                >
                  Approve
                </button>
              ) : (
                <button 
                  onClick={() => toggleVisibility(t)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Hide
                </button>
              )}
              
              <button 
                onClick={() => startEdit(t)} 
                style={{ flex: 1, background: 'rgba(219, 192, 126, 0.1)', color: '#DBC07E', border: '1px solid rgba(219, 192, 126, 0.3)', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTestimonial(t.id)} 
                style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)', color: '#888' }}>
            No testimonials found.
          </div>
        )}
      </div>

      {(editing || isAdding) && (
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '12px', border: '1px solid #222', maxWidth: '800px' }}>
          <h3 style={{ color: '#DBC07E', marginBottom: '25px', fontSize: '20px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
            {isAdding ? 'Add New Testimonial' : 'Edit Testimonial'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Client Name (EN)</label>
              <input name="client_name_en" value={form.client_name_en || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Client Name (AR)</label>
              <input name="client_name_ar" value={form.client_name_ar || ''} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Review Content (EN)</label>
              <textarea name="content_en" value={form.content_en || ''} onChange={handleChange} style={{...inputStyle, minHeight: '100px'}}></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Review Content (AR)</label>
              <textarea name="content_ar" value={form.content_ar || ''} onChange={handleChange} style={{...inputStyle, minHeight: '100px'}}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Rating (1-5)</label>
              <select name="rating" value={form.rating || 5} onChange={handleChange} style={inputStyle}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#fff' }}>
                <input type="checkbox" name="isVisible" checked={form.isVisible !== false} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                Approved & Visible to Public
              </label>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button 
              onClick={submitUpdate} 
              style={{ padding: '12px 30px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Save Testimonial
            </button>
            <button 
              onClick={() => { setEditing(null); setIsAdding(false); }} 
              style={{ padding: '12px 30px', background: 'transparent', color: '#aaa', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
