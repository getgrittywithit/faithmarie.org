'use client';

import { useState } from 'react';

export default function PartnerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
    setFormData({ name: '', email: '', organization: '', message: '' });
    setErrorMessage('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
      >
        Contact Us
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Partnership Inquiry</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Inquiry Submitted!</h3>
                <p className="text-gray-600 mb-6">Thank you for your interest in partnering with us. We&apos;ll be in touch soon.</p>
                <button
                  onClick={handleClose}
                  className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="University, company, or organization name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How would you like to partner? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your organization and how you'd like to collaborate"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    disabled={isLoading}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
