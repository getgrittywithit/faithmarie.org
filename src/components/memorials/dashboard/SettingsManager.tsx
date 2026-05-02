'use client';

import { useState } from 'react';
import { Save, Lock, Globe, Palette, Loader2, AlertTriangle } from 'lucide-react';
import bcrypt from 'bcryptjs';

interface Memorial {
  id: string;
  slug: string;
  privacy: 'public' | 'password';
  accent_color: string;
  theme: string;
  status: string;
}

interface SettingsManagerProps {
  memorial: Memorial;
}

export default function SettingsManager({ memorial }: SettingsManagerProps) {
  const [privacy, setPrivacy] = useState(memorial.privacy);
  const [password, setPassword] = useState('');
  const [accentColor, setAccentColor] = useState(memorial.accent_color || 'teal');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const accentColors = [
    { value: 'teal', label: 'Teal', class: 'bg-teal-500' },
    { value: 'amber', label: 'Amber', class: 'bg-amber-500' },
    { value: 'rose', label: 'Rose', class: 'bg-rose-500' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const updateData: Record<string, unknown> = {
        privacy,
        accent_color: accentColor,
      };

      // Hash password if setting password protection
      if (privacy === 'password' && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.privacy_password_hash = hashedPassword;
      }

      const response = await fetch(`/api/memorials/${memorial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully' });
      setPassword('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save settings',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/memorials/${memorial.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete memorial');
      }

      window.location.href = '/memorials/dashboard';
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete memorial' });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure privacy, appearance, and other options
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Privacy Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-400" />
            Privacy
          </h2>
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={privacy === 'public'}
                onChange={() => setPrivacy('public')}
                className="mt-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-800">Public</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Anyone with the link can view this memorial
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="privacy"
                value="password"
                checked={privacy === 'password'}
                onChange={() => setPrivacy('password')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-800">
                    Password Protected
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Visitors must enter a password to view
                </p>
                {privacy === 'password' && (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set a new password"
                    className="mt-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-400" />
            Appearance
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accent Color
            </label>
            <div className="flex gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 transition-colors ${
                    accentColor === color.value
                      ? 'border-gray-800'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full ${color.class}`} />
                  <span className="text-sm text-gray-700">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Memorial URL */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Memorial URL</h2>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-md">
            <span className="text-gray-500">faithmarie.org/in-memory/</span>
            <span className="font-medium text-gray-800">{memorial.slug}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            This URL cannot be changed after creation
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
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
                Save Settings
              </>
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl border border-red-200 p-6">
          <h2 className="text-lg font-medium text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-gray-600 mb-4">
            Permanently delete this memorial. This action cannot be undone.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              Delete Memorial
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Are you sure?</span>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
