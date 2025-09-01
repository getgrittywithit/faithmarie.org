'use client';

import Navigation from '@/components/Navigation';
import ResourcesSearch from '@/components/ResourcesSearch';
import ResourceModal from '@/components/ResourceModal';
import { useState } from 'react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const emergencyResources = [
    {
      title: "Crisis Hotline",
      description: "24/7 support for families in crisis",
      contact: "1-800-FAITH-MARIE",
      action: "Call Now",
      urgent: true
    },
    {
      title: "Emergency Financial Aid",
      description: "Fast-track assistance for urgent medical expenses",
      contact: "Apply online or call",
      action: "Get Help",
      urgent: true
    },
    {
      title: "Insurance Appeals",
      description: "Immediate help with denied claims and coverage",
      contact: "advocacy@faithmarie.org",
      action: "Get Advocate",
      urgent: true
    }
  ];

  const journeyResources = [
    {
      id: 'new-diagnosis',
      title: '"I Just Got the Diagnosis"',
      icon: '🏥',
      description: 'Your baby has been diagnosed with a heart condition. You need to understand what comes next.',
      resources: [
        {
          title: 'Understanding Your Baby\'s Condition',
          description: 'Plain-language explanations of common heart conditions',
          type: 'Guide',
          urgency: 'high',
          content: {
            type: 'guide',
            data: {
              overview: 'Heart conditions in babies can be overwhelming to understand. This guide breaks down the most common conditions in simple terms, helping you understand what your baby is facing.',
              steps: [
                'Learn the basic anatomy of your baby\'s heart',
                'Understand your specific diagnosis in simple terms',
                'Know what questions to ask your medical team',
                'Understand treatment options and timelines',
                'Connect with other families with similar conditions'
              ],
              links: [
                { title: 'American Heart Association - Congenital Heart Defects', url: 'https://www.heart.org/en/health-topics/congenital-heart-defects' },
                { title: 'Children\'s Hospital Association Resource Guide', url: '#' }
              ],
              downloadUrl: '/resources/understanding-heart-conditions.pdf'
            }
          }
        },
        {
          title: 'Questions to Ask Your Doctor',
          description: 'Essential questions for your first cardiology appointment',
          type: 'Checklist',
          urgency: 'high',
          content: {
            type: 'checklist',
            data: {
              description: 'Use this checklist during your appointments to ensure you get all the information you need.',
              items: [
                { title: 'What exactly is wrong with my baby\'s heart?', description: 'Ask for a simple explanation you can understand' },
                { title: 'What treatment options are available?', description: 'Understand all your choices, not just the first recommendation' },
                { title: 'What are the risks of each treatment option?', description: 'Get specific numbers and percentages when possible' },
                { title: 'How urgent is this decision?', description: 'Know if you have time to get a second opinion' },
                { title: 'What will my baby\'s quality of life be like?', description: 'Both short-term and long-term outlook' },
                { title: 'Are there any experimental treatments available?', description: 'Ask about clinical trials or newer options' }
              ]
            }
          }
        },
        {
          title: 'Finding the Right Specialists',
          description: 'Directory of pediatric cardiologists by region and specialty',
          type: 'Directory',
          urgency: 'high'
        },
        {
          title: 'Second Opinion Resources',
          description: 'When and how to get a second medical opinion',
          type: 'Guide',
          urgency: 'medium'
        }
      ]
    },
    {
      id: 'treatment',
      title: '"We\'re in Treatment"',
      icon: '🏨',
      description: 'Your baby is receiving treatment. You need support navigating the complex medical system.',
      resources: [
        {
          title: 'Hospital Navigation Guide',
          description: 'Making sense of hospital systems and advocacy',
          type: 'Guide',
          urgency: 'high'
        },
        {
          title: 'Insurance Navigation',
          description: 'Understanding coverage, appeals, and maximizing benefits',
          type: 'Guide',
          urgency: 'high'
        },
        {
          title: 'Family Care During Long Stays',
          description: 'Self-care, sibling support, and maintaining relationships',
          type: 'Guide',
          urgency: 'medium'
        },
        {
          title: 'Medical Decision Making',
          description: 'Framework for making complex treatment decisions',
          type: 'Tool',
          urgency: 'high'
        }
      ]
    },
    {
      id: 'financial',
      title: '"I Need Financial Help"',
      icon: '💝',
      description: 'Medical expenses are overwhelming. You need immediate financial support and resources.',
      resources: [
        {
          title: 'Emergency Financial Assistance',
          description: 'Fast-track grants for immediate medical expenses',
          type: 'Application',
          urgency: 'critical',
          content: {
            type: 'application',
            data: {
              description: 'Apply for emergency financial assistance. We typically respond within 24 hours for urgent needs.',
              fields: ['name', 'phone', 'baby_name', 'immediate_need']
            }
          }
        },
        {
          title: 'Travel & Lodging Support',
          description: 'Help with costs of traveling to specialized hospitals',
          type: 'Program',
          urgency: 'high'
        },
        {
          title: 'Prescription Assistance Programs',
          description: 'Reduce or eliminate medication costs',
          type: 'Directory',
          urgency: 'high'
        },
        {
          title: 'Medical Bill Advocacy',
          description: 'Professional help negotiating and reducing bills',
          type: 'Service',
          urgency: 'medium'
        }
      ]
    },
    {
      id: 'grief',
      title: '"We Lost Our Baby"',
      icon: '🕊️',
      description: 'Your baby has died. You need support processing grief and honoring their memory.',
      resources: [
        {
          title: 'Immediate Grief Support',
          description: '24/7 counseling and crisis support for bereaved parents',
          type: 'Support',
          urgency: 'critical'
        },
        {
          title: 'Funeral and Memorial Planning',
          description: 'Guidance and financial assistance for services',
          type: 'Guide',
          urgency: 'high'
        },
        {
          title: 'Grief Support Groups',
          description: 'Connect with other parents who understand your loss',
          type: 'Community',
          urgency: 'high'
        },
        {
          title: 'Returning to Work and Life',
          description: 'Navigating the world after loss',
          type: 'Guide',
          urgency: 'medium'
        }
      ]
    }
  ];

  const filteredJourneys = journeyResources.filter(journey => {
    if (selectedFilter === 'all') return true;
    return journey.id === selectedFilter;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              Find Help Now
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Fast access to the resources you need, organized by where you are in your journey.
            </p>
          </div>

          {/* Emergency Resources - Always Visible */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-red-800 mb-4 flex items-center">
              🚨 Need Help Right Now?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyResources.map((resource, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">{resource.title}</h3>
                  <p className="text-red-700 text-sm mb-3">{resource.description}</p>
                  <div className="text-sm text-red-600 mb-3">{resource.contact}</div>
                  <button 
                    onClick={() => {
                      if (resource.action === 'Call Now') {
                        window.location.href = 'tel:1-800-555-0123';
                      } else if (resource.action === 'Get Help') {
                        setSelectedResource({
                          title: 'Emergency Financial Assistance',
                          description: 'Fast-track grants for immediate medical expenses',
                          type: 'Application',
                          urgency: 'critical',
                          content: {
                            type: 'application',
                            data: {
                              description: 'Apply for emergency financial assistance. We typically respond within 24 hours for urgent needs.'
                            }
                          }
                        });
                      } else if (resource.action === 'Get Advocate') {
                        window.location.href = 'mailto:advocacy@faithmarie.org?subject=Insurance Appeal Help Needed';
                      }
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors w-full"
                  >
                    {resource.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <ResourcesSearch onSearch={setSearchQuery} onFilterChange={setSelectedFilter} />

          {/* Journey-Based Resources */}
          <div className="space-y-8">
            {filteredJourneys.map((journey) => (
              <div key={journey.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-50 to-blue-50 p-6 border-b border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{journey.icon}</div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {journey.title}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {journey.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {journey.resources.map((resource, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {resource.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            resource.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                            resource.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {resource.description}
                        </p>
                        <button 
                          onClick={() => setSelectedResource(resource)}
                          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                          resource.urgency === 'critical' ? 'bg-red-600 hover:bg-red-700 text-white' :
                          resource.urgency === 'high' ? 'bg-rose-600 hover:bg-rose-700 text-white' :
                          'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}>
                          Access Resource
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-rose-50 p-8 rounded-lg text-center mt-16">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every family&apos;s situation is unique. Our resource specialists are here to help you 
              find exactly what you need, when you need it.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="bg-rose-600 text-white px-8 py-4 rounded-md text-lg hover:bg-rose-700 transition-colors">
                Chat with Specialist
              </button>
              <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors">
                Email Us
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <ResourceModal 
        resource={selectedResource} 
        onClose={() => setSelectedResource(null)} 
      />
    </>
  );
}