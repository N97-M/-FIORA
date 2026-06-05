import React, { useState } from 'react';

interface EditItemFormProps {
  item: any;
  fields: { key: string; label: string; type?: string }[];
  apiEndpoint: string; // e.g. '/api/services'
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditItemForm({ item, fields, apiEndpoint, onSuccess, onCancel }: EditItemFormProps) {
  const [formData, setFormData] = useState(() => {
    const init: any = {};
    fields.forEach(f => {
      init[f.key] = item[f.key] ?? '';
    });
    init.id = item.id;
    return init;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to update');
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} className="modal" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: '12px' }}>
            <label style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea name={f.key} value={formData[f.key]} onChange={handleChange} rows={3} style={{ width: '100%', padding: '8px' }} />
            ) : (
              <input type="text" name={f.key} value={formData[f.key]} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
            )}
          </div>
        ))}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel} disabled={loading} style={{ padding: '6px 12px' }}>Cancel</button>
          <button type="submit" disabled={loading} style={{ padding: '6px 12px' }}>{loading ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
