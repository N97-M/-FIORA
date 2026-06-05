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
    <div className="p-4">
      <h2 className="text-2xl mb-4" style={{ color: "#DBC07E" }}>
        Manage Services
      </h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2">Title (EN)</th>
            <th className="p-2">Title (AR)</th>
            <th className="p-2">Icon</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((svc) => (
            <tr key={svc.id} className="border-b border-gray-700">
              <td className="p-2">{svc.title_en}</td>
              <td className="p-2">{svc.title_ar}</td>
              <td className="p-2"><i className={svc.icon}></i></td>
              <td className="p-2 space-x-2">
                <button onClick={() => startEdit(svc)} className="px-3 py-1 bg-blue-600 text-white rounded">
                  Edit
                </button>
                <button onClick={() => deleteService(svc.id)} className="px-3 py-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="mt-6 p-4 border border-gray-600 rounded">
          <h3 className="text-xl mb-2" style={{ color: "#DBC07E" }}>
            Edit Service
          </h3>
          <label className="block mb-2">
            Title EN
            <input name="title_en" value={form.title_en || ""} onChange={handleChange} className="w-full p-1 bg-gray-800 text-white" />
          </label>
          <label className="block mb-2">
            Title AR
            <input name="title_ar" value={form.title_ar || ""} onChange={handleChange} className="w-full p-1 bg-gray-800 text-white" />
          </label>
          <label className="block mb-2">
            Description EN
            <textarea name="desc_en" value={form.desc_en || ""} onChange={handleChange} className="w-full p-1 bg-gray-800 text-white"></textarea>
          </label>
          <label className="block mb-2">
            Description AR
            <textarea name="desc_ar" value={form.desc_ar || ""} onChange={handleChange} className="w-full p-1 bg-gray-800 text-white"></textarea>
          </label>
          <label className="block mb-2">
            Icon Class
            <input name="icon" value={form.icon || ""} onChange={handleChange} className="w-full p-1 bg-gray-800 text-white" />
          </label>
          <div className="mt-3 space-x-2">
            <button onClick={submitUpdate} className="px-4 py-2 bg-green-600 text-white rounded">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-600 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
