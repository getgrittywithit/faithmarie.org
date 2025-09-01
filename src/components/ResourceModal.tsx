'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  type: string;
  urgency: string;
  content?: {
    type: 'guide' | 'checklist' | 'directory' | 'application' | 'external' | 'contact';
    data: any;
  };
}

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
}

export default function ResourceModal({ resource, onClose }: ResourceModalProps) {
  if (!resource) return null;

  const renderContent = () => {
    if (!resource.content) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            This resource is being prepared. In the meantime, please contact us directly for help.
          </p>
          <button 
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors"
            onClick={() => window.location.href = 'mailto:support@faithmarie.org'}
          >
            Contact Support Team
          </button>
        </div>
      );
    }

    switch (resource.content.type) {
      case 'guide':
        return (
          <div className="space-y-4">
            <div className="prose prose-gray max-w-none">
              <h3>What You Need to Know</h3>
              <p>{resource.content.data.overview}</p>
              
              <h3>Key Steps</h3>
              <ol>
                {resource.content.data.steps?.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              
              <h3>Additional Resources</h3>
              <ul>
                {resource.content.data.links?.map((link: any, index: number) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-4 pt-4 border-t">
              <button 
                className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition-colors"
                onClick={() => window.open(resource.content?.data.downloadUrl, '_blank')}
              >
                Download Guide (PDF)
              </button>
              <button 
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                onClick={() => window.location.href = 'mailto:support@faithmarie.org?subject=' + encodeURIComponent(resource.title)}
              >
                Get Personal Help
              </button>
            </div>
          </div>
        );
        
      case 'checklist':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">{resource.content.data.description}</p>
            <div className="space-y-3">
              {resource.content.data.items?.map((item: any, index: number) => (
                <label key={index} className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                  <div>
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex space-x-4 pt-4 border-t">
              <button 
                className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition-colors"
                onClick={() => window.print()}
              >
                Print Checklist
              </button>
              <button 
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                onClick={() => window.location.href = 'mailto:support@faithmarie.org?subject=Need help with: ' + encodeURIComponent(resource.title)}
              >
                Get Help with This
              </button>
            </div>
          </div>
        );
        
      case 'application':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Quick Application</h3>
              <p className="text-blue-700 text-sm mb-4">Get started immediately - we&apos;ll follow up within 24 hours.</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baby&apos;s Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Immediate Need *
                </label>
                <textarea 
                  required 
                  rows={3}
                  placeholder="Please describe what kind of help you need right now..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-rose-600 text-white py-3 px-4 rounded-md hover:bg-rose-700 transition-colors font-medium"
              >
                Submit Request - We&apos;ll Call You Today
              </button>
            </form>
          </div>
        );
        
      case 'external':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">{resource.content.data.description}</p>
            <div className="space-y-3">
              {resource.content.data.links?.map((link: any, index: number) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-800">{link.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{link.description}</div>
                  <div className="text-xs text-gray-500 mt-2">{link.organization}</div>
                </a>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              We&apos;re here to help you with {resource.title.toLowerCase()}.
            </p>
            <button 
              className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors"
              onClick={() => window.location.href = 'mailto:support@faithmarie.org?subject=' + encodeURIComponent(resource.title)}
            >
              Contact Our Specialists
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{resource.title}</h2>
            <p className="text-gray-600 mt-1">{resource.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}