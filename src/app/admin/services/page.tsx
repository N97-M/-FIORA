"use client";

import { useEffect, useState } from "react";

interface Service {
  id: string;
  title_en: string;
  title_ar: string;
  desc_en?: string;
  desc_ar?: string;
  icon?: string;
  isVisible?: boolean;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  const fetchServices = async () => {
    const res = await fetch("/api/services", { cache: "no-store" });
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const startEdit = (svc: Service) => {
    setEditing(svc);
    setForm({ ...svc });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitUpdate = async () => {
    if (!editing?.id) return;
    await fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, ...form }),
    });
    setEditing(null);
    fetchServices();
  };

  const deleteService = async (id: string) => {
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '1px', color: '#DBC07E', margin: 0 }}>
          Manage Services
        </h2>
      </div>

      <div style={{ backgroundColor: '#0a0a0a', borderRadius: '16px', border: '1px solid #222', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#111', borderBottom: '1px solid #333' }}>
                <th style={{ padding: '20px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600', width: '10%' }}>Icon</th>
                <th style={{ padding: '20px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600', width: '35%' }}>Title (English)</th>
                <th style={{ padding: '20px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600', width: '35%', textAlign: 'right' }}>Title (Arabic)</th>
                <th style={{ padding: '20px', color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600', width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} style={{ borderBottom: '1px solid #1a1a1a', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#111'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '20px', color: '#DBC07E', fontSize: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(219, 192, 126, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={svc.icon}></i>
                    </div>
                  </td>
                  <td style={{ padding: '20px', color: '#eee', fontSize: '15px', fontWeight: '500' }}>{svc.title_en}</td>
                  <td style={{ padding: '20px', color: '#eee', fontSize: '15px', fontWeight: '500', textAlign: 'right' }} dir="rtl">{svc.title_ar}</td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button onClick={() => startEdit(svc)} style={{ padding: '8px 16px', backgroundColor: 'rgba(219, 192, 126, 0.1)', color: '#DBC07E', border: '1px solid rgba(219, 192, 126, 0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#DBC07E'; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(219, 192, 126, 0.1)'; e.currentTarget.style.color = '#DBC07E'; }}>
                        Edit
                      </button>
                      <button onClick={() => deleteService(svc.id)} style={{ padding: '8px 16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div style={{ marginTop: '40px', backgroundColor: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #333', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <button onClick={() => setEditing(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#666', fontSize: '24px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
            &times;
          </button>
          
          <h3 style={{ fontSize: '22px', marginBottom: '30px', fontWeight: '300', color: '#DBC07E', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
            Edit Service
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Title (EN)</label>
              <input name="title_en" value={form.title_en || ""} onChange={handleChange} style={{ width: '100%', padding: '12px 15px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '15px', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#DBC07E'} onBlur={(e) => e.target.style.borderColor = '#333'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', textAlign: 'right' }}>Title (AR)</label>
              <input name="title_ar" value={form.title_ar || ""} onChange={handleChange} dir="rtl" style={{ width: '100%', padding: '12px 15px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '15px', textAlign: 'right', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#DBC07E'} onBlur={(e) => e.target.style.borderColor = '#333'} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Description (EN)</label>
              <textarea name="desc_en" value={form.desc_en || ""} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px 15px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '15px', outline: 'none', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = '#DBC07E'} onBlur={(e) => e.target.style.borderColor = '#333'}></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', textAlign: 'right' }}>Description (AR)</label>
              <textarea name="desc_ar" value={form.desc_ar || ""} onChange={handleChange} rows={3} dir="rtl" style={{ width: '100%', padding: '12px 15px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '15px', textAlign: 'right', outline: 'none', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = '#DBC07E'} onBlur={(e) => e.target.style.borderColor = '#333'}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Icon Class (FontAwesome)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input name="icon" value={form.icon || ""} onChange={handleChange} placeholder="e.g. fas fa-star" style={{ flex: 1, padding: '12px 15px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', fontFamily: 'monospace', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#DBC07E'} onBlur={(e) => e.target.style.borderColor = '#333'} />
                {form.icon && (
                  <div style={{ width: '45px', height: '45px', backgroundColor: 'rgba(219, 192, 126, 0.1)', border: '1px solid rgba(219, 192, 126, 0.3)', borderRadius: '8px', color: '#DBC07E', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={form.icon}></i>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', paddingTop: '20px', borderTop: '1px solid #222' }}>
            <button onClick={() => setEditing(null)} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #444', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#888'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444'}>
              Cancel
            </button>
            <button onClick={submitUpdate} style={{ padding: '12px 24px', backgroundColor: '#DBC07E', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(219,192,126,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c4a968'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DBC07E'}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
