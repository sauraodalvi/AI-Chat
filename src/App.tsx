import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { CharacterSelect } from './components/CharacterSelect';
import { characters } from './data/characters';
import type { Message } from './types/chat';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!selectedCharacter) return;

    const character = characters.find(c => c.id === selectedCharacter);
    if (!character) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real implementation, you would call your API here
      // For now, we'll simulate a response with different images
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rotate through different John Wick images for each response
      const johnWickImages = [
        'https://images.unsplash.com/photo-1584486188544-dc2e1417aff1?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1584486188544-dc2e1417aff2?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1584486188544-dc2e1417aff3?auto=format&fit=crop&q=80&w=400'
      ];
      
      const randomImage = johnWickImages[Math.floor(Math.random() * johnWickImages.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `As ${character.name}, I acknowledge your message: "${content}"`,
        imageUrl: randomImage
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-xl flex flex-col">
        {!selectedCharacter ? (
          <CharacterSelect
            onSelect={setSelectedCharacter}
            selectedId={selectedCharacter}
          />
        ) : (
          <>
            <header className="flex items-center gap-4 p-4 bg-gray-800 text-white">
              <button
                onClick={() => setSelectedCharacter(undefined)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                ←
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={characters.find(c => c.id === selectedCharacter)?.avatar}
                  alt="Character avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                />
                <h1 className="text-xl font-semibold">
                  {characters.find(c => c.id === selectedCharacter)?.name}
                </h1>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageSquare className="w-12 h-12 mb-2" />
                  <p>Start a conversation with John Wick</p>
                </div>
              ) : (
                messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
            </div>

            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;