'use client';

import { useEffect, useState } from 'react';

interface FooterData {
  logo_url: string;
  description_en: string;
  description_ar: string;
  copyright_en: string;
  copyright_ar: string;
  slogan_en: string;
  slogan_ar: string;
  address_en: string;
  address_ar: string;
  email: string;
  link1_en: string;
  link1_ar: string;
  link2_en: string;
  link2_ar: string;
  link3_en: string;
  link3_ar: string;
}

export default function AdminFooterPage() {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    fetch('/api/footer')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const upData = await res.json();
      if (!res.ok) throw new Error(upData.error || 'Upload failed');
      setData(prev => prev ? { ...prev, logo_url: upData.url } : null);
      setStatus({ type: 'success', msg: 'Logo uploaded. Remember to save changes.' });
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message });
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save');
      setStatus({ type: 'success', msg: 'Footer settings saved successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    padding: '8px', background: '#111', border: '1px solid #333',
    color: '#fff', borderRadius: '4px', width: '100%'
  };

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (!data) return null;

  return (
    <div className="p-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="text-2xl" style={{ color: '#DBC07E' }}>Footer Management</h2>
        <button onClick={saveChanges} disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded font-bold">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {status && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', background: status.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(255,68,68,0.1)', border: `1px solid ${status.type === 'success' ? '#34d39944' : '#ff444444'}`, color: status.type === 'success' ? '#34d399' : '#ff6666' }}>
          {status.msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Brand Section */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: '#DBC07E', marginBottom: '15px' }}>Brand & Description</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label className="block mb-1 text-gray-400 text-sm">Footer Logo</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {data.logo_url && <img src={data.logo_url} alt="logo" style={{ height: '40px', background: '#fff', padding: '5px', borderRadius: '4px' }} />}
              <input type="file" accept="image/*" onChange={handleLogoUpload} style={{...inputStyle, padding: '4px'}} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Description (EN)</label>
              <textarea name="description_en" value={data.description_en} onChange={handleChange} style={{...inputStyle, height: '60px'}} />
            </div>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Description (AR)</label>
              <textarea name="description_ar" value={data.description_ar} onChange={handleChange} style={{...inputStyle, height: '60px'}} />
            </div>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Slogan (EN)</label>
              <input name="slogan_en" value={data.slogan_en} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Slogan (AR)</label>
              <input name="slogan_ar" value={data.slogan_ar} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Contact & Links */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ color: '#DBC07E', marginBottom: '15px' }}>Contact & Links</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Address (EN)</label>
              <input name="address_en" value={data.address_en} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">Address (AR)</label>
              <input name="address_ar" value={data.address_ar} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="block mb-1 text-gray-400 text-sm">Email Address</label>
              <input name="email" type="email" value={data.email} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <h4 style={{ color: '#aaa', margin: '20px 0 10px', fontSize: '14px' }}>Quick Links</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input name="link1_en" value={data.link1_en} onChange={handleChange} placeholder="Link 1 (EN)" style={inputStyle} />
            <input name="link1_ar" value={data.link1_ar} onChange={handleChange} placeholder="Link 1 (AR)" style={inputStyle} />
            <input name="link2_en" value={data.link2_en} onChange={handleChange} placeholder="Link 2 (EN)" style={inputStyle} />
            <input name="link2_ar" value={data.link2_ar} onChange={handleChange} placeholder="Link 2 (AR)" style={inputStyle} />
            <input name="link3_en" value={data.link3_en} onChange={handleChange} placeholder="Link 3 (EN)" style={inputStyle} />
            <input name="link3_ar" value={data.link3_ar} onChange={handleChange} placeholder="Link 3 (AR)" style={inputStyle} />
          </div>

          <h4 style={{ color: '#aaa', margin: '20px 0 10px', fontSize: '14px' }}>Copyright Info</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input name="copyright_en" value={data.copyright_en} onChange={handleChange} placeholder="Copyright (EN)" style={inputStyle} />
            <input name="copyright_ar" value={data.copyright_ar} onChange={handleChange} placeholder="Copyright (AR)" style={inputStyle} />
          </div>
          
          <p className="text-gray-500 text-xs mt-6 italic">Note: Social media icons and links are managed from the General Settings page to ensure consistency across the site.</p>
        </div>
      </div>
    </div>
  );
}
