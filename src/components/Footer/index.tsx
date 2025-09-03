import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import { GameActions } from '../GameActions';

export const Footer: React.FC = () => {
  const { stage, clearBets, spinWheel } = useRoulette();

  return (
    <GameActions
      stage={stage}
      onClearBets={clearBets}
      onPlaceBet={spinWheel}
    />
  );
};
