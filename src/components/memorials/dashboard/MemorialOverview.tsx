'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface Memorial {
  id: string;
  deceased_full_name: string;
  deceased_dob: string;
  deceased_dod: string;
  epitaph: string | null;
  obituary_text: string | null;
  status: string;
}

interface MemorialOverviewProps {
  memorial: Memorial;
}

export default function MemorialOverview({ memorial }: MemorialOverviewProps) {
  const [formData, setFormData] = useState({
    deceased_full_name: memorial.deceased_full_name,
    deceased_dob: memorial.deceased_dob,
    deceased_dod: memorial.deceased_dod,
    epitaph: memorial.epitaph || '',
    obituary_text: memorial.obituary_text || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/memorials/${memorial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save changes');
      }

      setMessage({ type: 'success', text: 'Changes saved successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save changes',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800">Memorial Overview</h1>
        <p className="text-gray-600 mt-1">
          Edit the basic information for this memorial
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label
                htmlFor="deceased_full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="deceased_full_name"
                name="deceased_full_name"
                value={formData.deceased_full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deceased_dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="deceased_dob"
                name="deceased_dob"
                value={formData.deceased_dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="deceased_dod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Passing
              </label>
              <input
                type="date"
                id="deceased_dod"
                name="deceased_dod"
                value={formData.deceased_dod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Epitaph</h2>
          <p className="text-sm text-gray-600 mb-3">
            A short phrase or quote that appears below the name (optional)
          </p>
          <input
            type="text"
            id="epitaph"
            name="epitaph"
            value={formData.epitaph}
            onChange={handleChange}
            placeholder="Forever in our hearts..."
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Life Story / Obituary
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Share the story of your loved one&apos;s life
          </p>
          <textarea
            id="obituary_text"
            name="obituary_text"
            value={formData.obituary_text}
            onChange={handleChange}
            rows={12}
            placeholder="Tell the story of their life, their passions, their legacy..."
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
