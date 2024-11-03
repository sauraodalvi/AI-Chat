import React from 'react';
import { characters } from '../data/characters';

interface CharacterSelectProps {
  onSelect: (characterId: string) => void;
  selectedId?: string;
}

export function CharacterSelect({ onSelect, selectedId }: CharacterSelectProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold text-gray-800">Choose your character</h2>
      <div className="grid grid-cols-1 gap-4">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => onSelect(character.id)}
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              selectedId === character.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <img
              src={character.avatar}
              alt={character.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">{character.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {character.background}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}