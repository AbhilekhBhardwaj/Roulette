import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import { StatsBar } from '../StatsBar';
import { ChipSelector } from '../ChipSelector';

export const Header: React.FC = () => {
  const { balance, totalBet, lastWin } = useRoulette();

  return (
    <div className="top-bar">
      <StatsBar 
        balance={balance} 
        totalBet={totalBet} 
        lastWin={lastWin} 
      />
      <ChipSelector />
    </div>
  );
};
