import React from 'react';
import { formatCurrency } from '../utils/rouletteUtils';

interface StatsBarProps {
  balance: number;
  totalBet: number;
  lastWin: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ balance, totalBet, lastWin }) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <span>Balance</span>
        <strong>{formatCurrency(balance)}</strong>
      </div>
      <div className="stat-item">
        <span>Bet</span>
        <strong>{formatCurrency(totalBet)}</strong>
      </div>
      <div className="stat-item">
        <span>Last win</span>
        <strong>{formatCurrency(lastWin)}</strong>
      </div>
    </div>
  );
};
