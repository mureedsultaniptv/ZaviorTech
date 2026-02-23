// app/chat.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocalAI } from '@/lib/hooks/useLocalAI';
import { services } from '@/lib/data/demo-data'; // move your services array to a separate file for reusability

// ---------- Improved Rule‑Based Engine ----------
// We'll maintain a simple state machine for the fallback conversation.

// Define possible conversation states
const STATES = {
  START: 'START',
  ASK_SERVICE: 'ASK_SERVICE',
  EPRS: 'EPRS',
  WEB: 'WEB',
  MOBILE: 'MOBILE',
  IT_SOLUTIONS: 'IT_SOLUTIONS',
  AI_AUTOMATION: 'AI_AUTOMATION',
  CORE_IT: 'CORE_IT',
  PRICING: 'PRICING',
  CONTACT: 'CONTACT',
};

// Responses and transitions
const fallbackRules = {
  [STATES.START]: {
    keywords: ['erp', 'odoo', 'enterprise'],
    response: (userInput, state) => {
      if (userInput.toLowerCase().includes('hotel')) {
        return "Great! We have extensive experience implementing ERP for hotels. Our Odoo solution can manage reservations, housekeeping, billing, and inventory. Would you like details on hotel‑specific modules?";
      }
      return "Our ERP & Odoo solutions streamline business operations. Which industry are you in? (e.g., hotel, retail, manufacturing)";
    },
    nextState: STATES.EPRS,
  },
  [STATES.EPRS]: {
    keywords: ['erp', 'odoo', 'module', 'custom'],
    response: (userInput, state) => {
      if (userInput.toLowerCase().includes('hotel')) {
        return "For hotels, we offer modules for room booking, POS, housekeeping management, and integration with channel managers. Would you like a demo?";
      }
      if (userInput.toLowerCase().includes('module')) {
        return "We develop custom Odoo modules tailored to your workflow. Tell me more about the functionality you need.";
      }
      return "Our ERP services include implementation, customization, training, and support. What specific aspect are you interested in?";
    },
    nextState: STATES.EPRS, // stay in this state unless user changes topic
  },
  [STATES.WEB]: {
    keywords: ['web', 'website', 'development'],
    response: (userInput, state) => {
      if (userInput.toLowerCase().includes('ecommerce') || userInput.toLowerCase().includes('shop')) {
        return "We build powerful e‑commerce platforms with Next.js and headless CMS. Would you like to see examples?";
      }
      return "We build modern websites and web apps. Do you need a corporate site, e‑commerce, or a custom web application?";
    },
    nextState: STATES.WEB,
  },
  // ... similar for other services
  [STATES.PRICING]: {
    keywords: ['price', 'cost', 'how much'],
    response: (userInput, state) => {
      return "Pricing depends on scope and requirements. Could you tell me which service you're interested in? I'll connect you with a specialist for a quote.";
    },
    nextState: STATES.ASK_SERVICE,
  },
  [STATES.CONTACT]: {
    keywords: ['contact', 'speak', 'human', 'specialist'],
    response: (userInput, state) => {
      return "You can reach us at contact@zavior.tech or call +1 (555) 123-4567. Our team typically responds within 24 hours.";
    },
    nextState: STATES.START,
  },
  [STATES.ASK_SERVICE]: {
    keywords: [],
    response: (userInput, state) => {
      return "I can help with ERP, Web Development, Mobile Apps, IT Solutions, AI Automation, or Core IT Infrastructure. Which one interests you?";
    },
    nextState: STATES.START,
  },
};

// Fallback function that uses state and context
function getFallbackReply(userMessage, conversationState, setConversationState) {
  const lower = userMessage.toLowerCase();
  
  // Check for state transitions based on keywords
  for (const [state, rule] of Object.entries(fallbackRules)) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      // Generate response using the rule, passing user message and current state
      const response = rule.response(userMessage, conversationState);
      setConversationState(rule.nextState); // update state
      return response;
    }
  }
  
  // If no keyword matched, stay in current state but give a generic prompt
  const currentRule = fallbackRules[conversationState] || fallbackRules[STATES.ASK_SERVICE];
  const response = currentRule.response(userMessage, conversationState);
  setConversationState(currentRule.nextState);
  return response;
}

// ---------- Chat Components ----------
const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

// ---------- Main Chat Page ----------
export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your Zavior Tech assistant. Ask me about our ERP, Web, Mobile, IT Solutions, AI Automation, or Core IT Infrastructure services.",
      sender: 'bot',
    },
  ]);
  // State for fallback conversation
  const [convState, setConvState] = useState(STATES.START);

  const { generateResponse, loading, error, webGPUAvailable } = useLocalAI();

  const handleSendMessage = async (userMessage) => {
    // Add user message
    const userMsg = { id: Date.now(), text: userMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);

    let botReplyText = '';

    // Try AI if available and no error
    if (!loading && !error && generateResponse) {
      try {
        // Build conversation history
        const history = messages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

        botReplyText = await generateResponse(
          [...history, { role: 'user', content: userMessage }],
          services
        );
      } catch (err) {
        console.warn('AI generation failed, using fallback', err);
        botReplyText = getFallbackReply(userMessage, convState, setConvState);
      }
    } else {
      botReplyText = getFallbackReply(userMessage, convState, setConvState);
    }

    const botMsg = { id: Date.now() + 1, text: botReplyText, sender: 'bot' };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Zavior Tech Assistant</h1>
        {loading && <p className="text-sm text-blue-200">Loading AI model (one-time download)...</p>}
        {!loading && webGPUAvailable && (
          <p className="text-xs text-green-200">⚡ Using WebGPU (your GPU)</p>
        )}
        {!loading && !webGPUAvailable && (
          <p className="text-xs text-yellow-200">⚠️ Using CPU (responses may be slower)</p>
        )}
        {error && <p className="text-xs text-red-200">AI model failed, using fallback.</p>}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}