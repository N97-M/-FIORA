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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light tracking-wide" style={{ color: "#DBC07E" }}>
          Manage Services
        </h2>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#333] bg-[#0a0a0a]">
                <th className="px-6 py-4 text-sm font-medium text-[#DBC07E] uppercase tracking-wider text-center w-16">Icon</th>
                <th className="px-6 py-4 text-sm font-medium text-[#DBC07E] uppercase tracking-wider">English Title</th>
                <th className="px-6 py-4 text-sm font-medium text-[#DBC07E] uppercase tracking-wider text-right" dir="rtl">Arabic Title (العنوان)</th>
                <th className="px-6 py-4 text-sm font-medium text-[#DBC07E] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 mx-auto rounded bg-[#222] text-[#DBC07E] flex items-center justify-center border border-[#333]">
                      <i className={svc.icon || "fas fa-star"}></i>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium text-lg">{svc.title_en}</div>
                    {svc.desc_en && <div className="text-gray-400 text-sm truncate max-w-xs mt-1">{svc.desc_en}</div>}
                  </td>
                  <td className="px-6 py-4 text-right" dir="rtl">
                    <div className="text-white font-medium text-lg font-arabic">{svc.title_ar}</div>
                    {svc.desc_ar && <div className="text-gray-400 text-sm truncate max-w-xs mt-1 font-arabic">{svc.desc_ar}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => startEdit(svc)} 
                        className="text-sm px-4 py-2 bg-[#222] text-[#DBC07E] hover:bg-[#DBC07E] hover:text-black border border-[#333] rounded transition-all flex items-center gap-2"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button 
                        onClick={() => deleteService(svc.id)} 
                        className="text-sm px-4 py-2 bg-[#222] text-red-400 hover:bg-red-500 hover:text-white border border-[#333] rounded transition-all flex items-center gap-2"
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-3 opacity-50 block"></i>
                    No services found. Add a new service to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="mt-8 p-6 bg-[#111] border border-[#DBC07E] rounded-lg shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DBC07E] to-transparent opacity-50"></div>
          <h3 className="text-2xl mb-6 font-light tracking-wide" style={{ color: "#DBC07E" }}>
            <i className="fas fa-edit mr-3"></i> Edit Service
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">English Title</label>
              <input name="title_en" value={form.title_en || ""} onChange={handleChange} className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-md text-white focus:border-[#DBC07E] focus:ring-1 focus:ring-[#DBC07E] focus:outline-none transition-all" placeholder="e.g. Wedding Decor" />
            </div>
            <div>
              <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Arabic Title (العنوان بالعربية)</label>
              <input name="title_ar" value={form.title_ar || ""} onChange={handleChange} className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-md text-white focus:border-[#DBC07E] focus:ring-1 focus:ring-[#DBC07E] focus:outline-none transition-all text-right font-arabic" dir="rtl" placeholder="مثال: ديكور الزفاف" />
            </div>
            
            <div>
              <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">English Description</label>
              <textarea name="desc_en" value={form.desc_en || ""} onChange={handleChange} rows={3} className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-md text-white focus:border-[#DBC07E] focus:ring-1 focus:ring-[#DBC07E] focus:outline-none transition-all" placeholder="Short description..."></textarea>
            </div>
            <div>
              <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Arabic Description (الوصف بالعربية)</label>
              <textarea name="desc_ar" value={form.desc_ar || ""} onChange={handleChange} rows={3} className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-md text-white focus:border-[#DBC07E] focus:ring-1 focus:ring-[#DBC07E] focus:outline-none transition-all text-right font-arabic" dir="rtl" placeholder="وصف قصير..."></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Icon Class (FontAwesome)</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-[#0a0a0a] border border-[#333] flex items-center justify-center text-[#DBC07E] text-xl shrink-0">
                  <i className={form.icon || "fas fa-star"}></i>
                </div>
                <input name="icon" value={form.icon || ""} onChange={handleChange} className="w-full p-3 bg-[#0a0a0a] border border-[#333] rounded-md text-white focus:border-[#DBC07E] focus:ring-1 focus:ring-[#DBC07E] focus:outline-none transition-all" placeholder="e.g. fas fa-ring" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#333] flex justify-end gap-4">
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 bg-transparent border border-[#555] text-gray-300 hover:bg-[#222] hover:text-white rounded-md font-medium transition-all">
              Cancel
            </button>
            <button onClick={submitUpdate} className="px-6 py-2.5 bg-[#DBC07E] text-black hover:bg-[#e8cd8f] rounded-md font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(219,192,126,0.3)]">
              <i className="fas fa-check"></i> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
