export interface Message {
  id: number;
  text: string;
  isAi: boolean;
  imageUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  prompt: string;
}