import OpenAI from 'openai';
import { Message, Character } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateChatResponse(messages: Message[], character: Character): Promise<string> {
  const conversation = messages.map(msg => ({
    role: msg.isAi ? 'assistant' : 'user',
    content: msg.text
  }));

  // Add character context as system message
  conversation.unshift({
    role: 'system',
    content: character.prompt
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: conversation,
    temperature: 0.7,
    max_tokens: 150
  });

  return response.choices[0].message.content || '';
}

export async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `${prompt}, cinematic style, dark atmosphere`,
    n: 1,
    size: '1024x1024'
  });

  return response.data[0].url || '';
}