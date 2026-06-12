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
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      } else {
        console.error("API returned non-array:", data);
        setServices([]);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setServices([]);
    }
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

  const startAdd = () => {
    setEditing({ id: 'new', title_en: '', title_ar: '' });
    setForm({ title_en: '', title_ar: '', desc_en: '', desc_ar: '', icon: 'fas fa-star', isVisible: true });
  };

  const submitUpdate = async () => {
    if (!editing) return;
    
    if (editing.id === 'new') {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    }
    setEditing(null);
    fetchServices();
  };

  const deleteService = async (id: string) => {
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#DBC07E', margin: 0, fontFamily: 'var(--font-h2)' }}>
          Manage Services
        </h2>
        <button 
          onClick={startAdd}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '12px' }}
        >
          <i className="fas fa-plus"></i> Add New Service
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '25px' 
      }}>
        {services.map((svc) => (
          <div key={svc.id} style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(219, 192, 126, 0.1)',
            borderRadius: '12px',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
             e.currentTarget.style.borderColor = 'rgba(219, 192, 126, 0.5)';
             e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.borderColor = 'rgba(219, 192, 126, 0.1)';
             e.currentTarget.style.transform = 'none';
          }}
          >
            <div style={{
              width: '50px', height: '50px',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(219, 192, 126, 0.2)',
              borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: '#DBC07E', fontSize: '20px', marginBottom: '20px'
            }}>
              <i className={svc.icon || "fas fa-star"}></i>
            </div>
            
            <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '5px', fontWeight: '500' }}>{svc.title_en}</h3>
            <h3 style={{ fontSize: '16px', color: '#DBC07E', marginBottom: '15px', fontFamily: 'var(--font-arabic)', textAlign: 'right' }} dir="rtl">{svc.title_ar}</h3>
            
            <div style={{ flexGrow: 1 }}>
              {svc.desc_en && <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px', lineHeight: '1.5' }}>{svc.desc_en}</p>}
              {svc.desc_ar && <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'var(--font-arabic)', textAlign: 'right' }} dir="rtl">{svc.desc_ar}</p>}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                onClick={() => startEdit(svc)} 
                style={{
                  background: 'rgba(219, 192, 126, 0.1)',
                  color: '#DBC07E',
                  border: '1px solid rgba(219, 192, 126, 0.3)',
                  padding: '6px 15px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#DBC07E'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(219, 192, 126, 0.1)'; e.currentTarget.style.color = '#DBC07E'; }}
              >
                <i className="fas fa-edit"></i> Edit
              </button>
              <button 
                onClick={() => deleteService(svc.id)} 
                style={{
                  background: 'rgba(255, 68, 68, 0.1)',
                  color: '#ff4444',
                  border: '1px solid rgba(255, 68, 68, 0.3)',
                  padding: '6px 15px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ff4444'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)'; e.currentTarget.style.color = '#ff4444'; }}
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '50px', textAlign: 'center', color: '#666', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <i className="fas fa-inbox" style={{ fontSize: '40px', marginBottom: '15px', opacity: 0.5 }}></i>
            <p>No services found. Add a new service to get started.</p>
          </div>
        )}
      </div>

      {editing && (
        <div style={{
          marginTop: '40px', padding: '30px', background: 'rgba(10, 10, 10, 0.8)',
          border: '1px solid #DBC07E', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg, transparent, #DBC07E, transparent)', opacity: 0.5 }}></div>
          
          <h3 style={{ fontSize: '22px', marginBottom: '25px', color: '#DBC07E', fontWeight: '300' }}>
            <i className="fas fa-edit" style={{ marginRight: '10px' }}></i> Edit Service
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>English Title</label>
              <input name="title_en" value={form.title_en || ""} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', outline: 'none' }} placeholder="e.g. Wedding Decor" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', textAlign: 'right' }}>Arabic Title (العنوان بالعربية)</label>
              <input name="title_ar" value={form.title_ar || ""} onChange={handleChange} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', outline: 'none', textAlign: 'right', fontFamily: 'var(--font-arabic)' }} dir="rtl" placeholder="مثال: ديكور الزفاف" />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>English Description</label>
              <textarea name="desc_en" value={form.desc_en || ""} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', outline: 'none', resize: 'vertical' }} placeholder="Short description..."></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', textAlign: 'right' }}>Arabic Description (الوصف بالعربية)</label>
              <textarea name="desc_ar" value={form.desc_ar || ""} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', outline: 'none', textAlign: 'right', fontFamily: 'var(--font-arabic)', resize: 'vertical' }} dir="rtl" placeholder="وصف قصير..."></textarea>
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Icon Class (FontAwesome)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#DBC07E', fontSize: '18px', flexShrink: 0 }}>
                  <i className={form.icon || "fas fa-star"}></i>
                </div>
                <input name="icon" value={form.icon || ""} onChange={handleChange} style={{ flexGrow: 1, padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', outline: 'none' }} placeholder="e.g. fas fa-ring" />
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
            <button onClick={() => setEditing(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#ccc', padding: '10px 25px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
              Cancel
            </button>
            <button onClick={submitUpdate} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 25px', fontSize: '13px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              <i className="fas fa-check"></i> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
