export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  background: string;
}