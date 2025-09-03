import React from 'react';
import { RouletteProvider } from '../contexts/RouletteContext';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';

const RouletteGameContent: React.FC = () => {
  return (
    <div className="roulette-game">
      <Header />
      <MainContent />
      <Footer />
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