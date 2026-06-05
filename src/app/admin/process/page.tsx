'use client';

import { useEffect, useState } from 'react';

interface ProcessStep {
  id: string;
  step_number: number;
  title_en: string;
  title_ar: string;
  desc_en?: string;
  desc_ar?: string;
  isVisible: boolean;
}

export default function AdminProcessPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [form, setForm] = useState<Partial<ProcessStep>>({});
  const [isAdding, setIsAdding] = useState(false);

  const fetchSteps = async () => {
    const res = await fetch('/api/process', { cache: 'no-store' });
    const data = await res.json();
    setSteps(data);
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const startEdit = (step: ProcessStep) => {
    setEditing(step);
    setForm({ ...step });
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditing(null);
    setForm({ step_number: steps.length + 1, isVisible: true });
    setIsAdding(true);
  };

  const submitUpdate = async () => {
    if (isAdding) {
      await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      if (!editing?.id) return;
      await fetch('/api/process', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    }
    setEditing(null);
    setIsAdding(false);
    fetchSteps();
  };

  const deleteStep = async (id: string) => {
    if(!confirm("Are you sure you want to delete this process step?")) return;
    await fetch(`/api/process?id=${id}`, { method: 'DELETE' });
    fetchSteps();
  };

  const toggleVisibility = async (step: ProcessStep) => {
    await fetch('/api/process', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: step.id, isVisible: !step.isVisible }),
    });
    fetchSteps();
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
            How We Work (Process)
          </h2>
          <p style={{ color: '#888', margin: '5px 0 0 0', fontSize: '14px' }}>Manage the steps of your service workflow.</p>
        </div>
        <button 
          onClick={startAdd} 
          style={{ background: '#DBC07E', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>+ Add Process Step</span>
        </button>
      </div>

      {/* Timeline/Cards Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px', maxWidth: '900px' }}>
        {steps.sort((a, b) => a.step_number - b.step_number).map((step, index) => (
          <div key={step.id} style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.02)', 
            border: step.isVisible ? '1px solid #333' : '1px dashed rgba(255,255,255,0.1)', 
            borderRadius: '12px', 
            overflow: 'hidden',
            opacity: step.isVisible ? 1 : 0.6
          }}>
            {/* Step Number Badge */}
            <div style={{ 
              background: '#DBC07E', 
              color: '#000', 
              padding: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '80px',
              fontFamily: 'Playfair Display',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {step.step_number}
            </div>

            {/* Content */}
            <div style={{ padding: '20px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#fff' }}>{step.title_en} <span style={{ color: '#888', fontSize: '16px', fontWeight: 'normal' }}>| {step.title_ar}</span></h3>
                  <p style={{ margin: 0, color: '#aaa', fontSize: '14px', lineHeight: '1.5', maxWidth: '600px' }}>
                    {step.desc_en}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => toggleVisibility(step)} 
                    title="Toggle Visibility"
                    style={{ background: 'transparent', color: step.isVisible ? '#34d399' : '#888', border: '1px solid ' + (step.isVisible ? '#34d39944' : '#333'), padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    {step.isVisible ? 'Visible' : 'Hidden'}
                  </button>
                  <button 
                    onClick={() => startEdit(step)} 
                    style={{ background: 'rgba(219, 192, 126, 0.1)', color: '#DBC07E', border: '1px solid rgba(219, 192, 126, 0.3)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteStep(step.id)} 
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {steps.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)', color: '#888' }}>
            No process steps found. Add your first step to build the workflow.
          </div>
        )}
      </div>

      {/* Form */}
      {(editing || isAdding) && (
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '12px', border: '1px solid #222', maxWidth: '900px' }}>
          <h3 style={{ color: '#DBC07E', marginBottom: '25px', fontSize: '20px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
            {isAdding ? 'Add Process Step' : 'Edit Process Step'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ gridColumn: '1' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Step #</label>
              <input type="number" name="step_number" value={form.step_number || ''} onChange={handleChange} style={{...inputStyle, textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}} />
            </div>
            
            <div style={{ gridColumn: '2' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Title (EN)</label>
              <input name="title_en" value={form.title_en || ''} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ gridColumn: '3' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Title (AR)</label>
              <input name="title_ar" value={form.title_ar || ''} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ gridColumn: '2' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Description (EN)</label>
              <textarea name="desc_en" value={form.desc_en || ''} onChange={handleChange} style={{...inputStyle, minHeight: '100px'}}></textarea>
            </div>

            <div style={{ gridColumn: '3' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '13px' }}>Description (AR)</label>
              <textarea name="desc_ar" value={form.desc_ar || ''} onChange={handleChange} style={{...inputStyle, minHeight: '100px'}}></textarea>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#fff' }}>
                <input type="checkbox" name="isVisible" checked={form.isVisible !== false} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                Visible on Website
              </label>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button 
              onClick={submitUpdate} 
              style={{ padding: '12px 30px', background: '#DBC07E', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Save Step
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
