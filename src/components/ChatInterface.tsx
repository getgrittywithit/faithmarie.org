'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Bot, User, AlertTriangle, Loader2, Phone } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  crisis?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello, I'm the Faith Marie Foundation research assistant. I can help you understand our published mental health research on grief, PTSD, depression, and anxiety.

**What I can do:**
- Explain findings from our research digests
- Help you find relevant information
- Point you toward helpful resources

**What I can't do:**
- Provide therapy or counseling
- Give medical advice or diagnoses
- Replace professional mental health care

How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [crisisMessage, setCrisisMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();

      if (data.crisis) {
        setCrisisMessage(data.crisisMessage);
        setShowCrisisModal(true);
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.crisisMessage, crisis: true },
        ]);
      } else if (data.response) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      } else if (data.error) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `I'm sorry, I encountered an error: ${data.error}` },
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple markdown-like rendering for links and bold
  const renderContent = (content: string) => {
    // Convert markdown links to HTML
    const withLinks = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-teal-600 hover:text-teal-700 underline">$1</a>'
    );
    // Convert **bold** to HTML
    const withBold = withLinks.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong>$1</strong>'
    );
    // Convert newlines to <br>
    const withBreaks = withBold.replace(/\n/g, '<br />');

    return <span dangerouslySetInnerHTML={{ __html: withBreaks }} />;
  };

  return (
    <>
      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-800">You&apos;re Not Alone</h2>
            </div>
            <p className="text-gray-600 mb-6">
              If you&apos;re having thoughts of suicide or self-harm, please reach out to a crisis service right now.
              Trained counselors are available 24/7.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:988"
                className="flex items-center justify-between bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <span className="font-medium">988 Suicide & Crisis Lifeline</span>
                <span>Call Now</span>
              </a>
              <a
                href="sms:741741&body=HOME"
                className="flex items-center justify-between bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors"
              >
                <span className="font-medium">Crisis Text Line</span>
                <span>Text HOME to 741741</span>
              </a>
            </div>
            <button
              onClick={() => setShowCrisisModal(false)}
              className="w-full text-gray-600 hover:text-gray-800 text-sm"
            >
              Continue to chat
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[600px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-teal-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 text-sm">Research Assistant</h3>
            <p className="text-xs text-gray-500">Powered by Faith Marie Foundation</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-indigo-100'
                    : message.crisis
                    ? 'bg-red-100'
                    : 'bg-teal-100'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4 text-indigo-600" />
                ) : message.crisis ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <Bot className="h-4 w-4 text-teal-600" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : message.crisis
                    ? 'bg-red-50 border border-red-200 text-gray-800'
                    : 'bg-white shadow-sm text-gray-700'
                }`}
              >
                <div className="text-sm leading-relaxed">
                  {renderContent(message.content)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-teal-600" />
              </div>
              <div className="bg-white shadow-sm rounded-xl px-4 py-3">
                <Loader2 className="h-5 w-5 text-teal-600 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="bg-white border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our mental health research..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            This is an AI assistant, not a therapist.{' '}
            <Link href="/crisis-support" className="text-red-500 hover:underline">
              Crisis resources
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
