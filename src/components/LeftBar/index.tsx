import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import { formatCurrency } from '../../utils/rouletteUtils';

export const LeftBar: React.FC = () => {
  const { balance, totalBet, lastWin } = useRoulette();

  return (
    <div className="left-bar">
      <div className="stat-item-vertical">
        <span className="stat-label">Balance</span>
        <strong className="stat-value">{formatCurrency(balance)}</strong>
      </div>
      <div className="stat-item-vertical">
        <span className="stat-label">Total Bet</span>
        <strong className="stat-value">{formatCurrency(totalBet)}</strong>
      </div>
      <div className="stat-item-vertical">
        <span className="stat-label">Last Win</span>
        <strong className="stat-value">{formatCurrency(lastWin)}</strong>
      </div>
    </div>
  );
};
