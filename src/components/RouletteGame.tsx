import React from 'react';
import { RouletteProvider } from '../contexts/RouletteContext';
import { MainContent } from './MainContent';

const RouletteGameContent: React.FC = () => {
  return (
    <div className="roulette-game">
      <MainContent />
    </div>
  );
};

export const RouletteGame: React.FC = () => {
  return (
    <RouletteProvider>
      <RouletteGameContent />
    </RouletteProvider>
  );
};