import React from 'react';
import { StatsBar } from './StatsBar';
import { ChipSelector } from './ChipSelector';

interface TopBarProps {
  balance: number;
  totalBet: number;
  lastWin: number;
  // Remove chip-related props since ChipSelector gets them from context
}

export const TopBar: React.FC<TopBarProps> = ({
  balance,
  totalBet,
  lastWin
}) => {
  return (
    <div className="top-bar">
      <StatsBar 
        balance={balance} 
        totalBet={totalBet} 
        lastWin={lastWin} 
      />
      {/* ChipSelector no longer needs props */}
      <ChipSelector />
    </div>
  );
};
