import { create } from 'zustand';
import { Message, Character } from '../types';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  selectedCharacter: Character;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  setSelectedCharacter: (character: Character) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  selectedCharacter: {
    id: 'john-wick',
    name: 'John Wick',
    avatar: 'https://images.unsplash.com/photo-1615268417642-d7b2f98d6e04?w=150&h=150&fit=crop',
    prompt: 'You are John Wick, a legendary hitman known for your precision, determination, and loyalty. Respond in a way that reflects your stoic nature and intense personality.'
  },
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character })
}));