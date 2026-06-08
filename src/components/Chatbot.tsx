"use client";

import React, { useState } from 'react';
import { X, Send, MessageCircleDashed } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://mussarat123shamsher-porfolio-backend.hf.space";

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: input }] 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The backend returns a StreamingResponse with text/plain
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantReply = "";

      if (reader) {
        // Add an initial empty assistant message to update
        setMessages(prev => [...prev, { role: 'assistant', content: "" }]);
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          assistantReply += chunk;
          
          // Update the last message in the list
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: assistantReply };
            return updated;
          });
        }
      } else {
        // Fallback if body is null
        const text = await response.text();
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I am having trouble connecting to the backend.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fixed positioning is generally safer for a floating chat element, 
    // ensuring it doesn't get cut off by parent container constraints on wide screens.
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 xl:right-20 2xl:right-2/7 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-105"
        >
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-500/20 shadow-xl hidden md:block">
            MS Assistant
          </span>
          {/* Breathing Animation Background */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping"></span>
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)] text-white">
            <MessageCircleDashed size={24} />
          </div>
        </button>
      ) : (
        <div className="w-[90vw] h-[70vh] md:w-[350px] md:h-[400px] lg:h-[500px] overflow-y-auto bg-slate-900 border border-emerald-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-emerald-500/10 flex justify-between items-center">
            <h3 className="font-bold text-white">MS Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} className="text-slate-400" /></button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white ml-auto' 
                    : 'bg-slate-800 text-slate-100 mr-auto'
                }`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-slate-800 text-slate-100 mr-auto p-3 rounded-2xl max-w-[80%] flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-400 animate-pulse italic">MS Assistant is thinking</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-emerald-500/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-slate-800 rounded-lg p-2 text-white"
              placeholder="Ask me anything..."
            />
            <button onClick={handleSend} disabled={isLoading} className="p-2 bg-emerald-500 text-slate-950 rounded-lg">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
