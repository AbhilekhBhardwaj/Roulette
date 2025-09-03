import React from 'react';
import { StatsBar } from './StatsBar';
import { ChipSelector } from './ChipSelector';

interface TopBarProps {
  balance: number;
  totalBet: number;
  lastWin: number;
  selectedChip: number;
  onChipSelect: (chipValue: number) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  balance,
  totalBet,
  lastWin,
  selectedChip,
  onChipSelect
}) => {
  return (
    <div className="top-bar">
      <StatsBar 
        balance={balance} 
        totalBet={totalBet} 
        lastWin={lastWin} 
      />
      <ChipSelector 
        selectedChip={selectedChip} 
        onChipSelect={onChipSelect} 
      />
    </div>
  );
};
