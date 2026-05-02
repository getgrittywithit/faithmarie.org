'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';

interface LifeEvent {
  id: string;
  event_date: string;
  title: string;
  description: string | null;
}

interface TimelineManagerProps {
  memorialId: string;
  initialEvents: LifeEvent[];
}

export default function TimelineManager({
  memorialId,
  initialEvents,
}: TimelineManagerProps) {
  const [events, setEvents] = useState<LifeEvent[]>(initialEvents);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    event_date: '',
    title: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({ event_date: '', title: '', description: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (event: LifeEvent) => {
    setFormData({
      event_date: event.event_date,
      title: event.title,
      description: event.description || '',
    });
    setEditingId(event.id);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.event_date) {
      setMessage({ type: 'error', text: 'Date and title are required' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const url = editingId
        ? `/api/memorials/${memorialId}/timeline?eventId=${editingId}`
        : `/api/memorials/${memorialId}/timeline`;

      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save event');
      }

      const { event } = await response.json();

      if (editingId) {
        setEvents((prev) =>
          prev.map((e) => (e.id === editingId ? event : e))
        );
      } else {
        setEvents((prev) =>
          [...prev, event].sort(
            (a, b) =>
              new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
          )
        );
      }

      resetForm();
      setMessage({ type: 'success', text: editingId ? 'Event updated' : 'Event added' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save event',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(
        `/api/memorials/${memorialId}/timeline?eventId=${eventId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      setMessage({ type: 'success', text: 'Event deleted' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete event' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Timeline</h1>
          <p className="text-gray-600 mt-1">
            Add important life events and milestones
          </p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        )}
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

      {(isAdding || editingId) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            {editingId ? 'Edit Event' : 'Add Event'}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, event_date: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Graduated from Harvard"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={3}
              placeholder="Add more details about this event..."
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No timeline events yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Add important milestones and moments from their life
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex items-start justify-between"
            >
              <div className="flex gap-4">
                <div className="text-sm text-gray-500 font-medium min-w-[100px]">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
