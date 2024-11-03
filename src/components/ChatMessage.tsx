import React from 'react';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 items-start gap-3`}>
      {!isUser && message.imageUrl && (
        <img 
          src={message.imageUrl}
          alt="John Wick's Response"
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div className={`max-w-[70%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2`}>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}