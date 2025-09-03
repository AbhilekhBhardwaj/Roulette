import React from 'react';
import { getRouletteColor } from '../utils/rouletteUtils';

interface NumberHistoryProps {
  history: number[];
  maxNumbers?: number;
}

export const NumberHistory: React.FC<NumberHistoryProps> = ({ 
  history, 
  maxNumbers = 10 
}) => {
  const displayHistory = history.slice(0, maxNumbers);

  if (displayHistory.length === 0) {
    return (
      <div className="winner-history">
        <h3>📊 Number History</h3>
        <p className="history-subtitle">No spins yet</p>
      </div>
    );
  }

  const lastWinningNumber = displayHistory[0];
  const lastNumberColor = getRouletteColor(lastWinningNumber);
  const remainingNumbers = displayHistory.slice(1);

  return (
    <div className="winner-history">
      <h3>📊 Number History</h3>
      <div className="last-winning-container">
        <p className="history-subtitle">Last winning number:</p>
        <div className={`last-winning-number ${lastNumberColor}`}>
          {lastWinningNumber}
        </div>
      </div>
      {remainingNumbers.length > 0 && (
        <>
          <p className="history-subtitle previous-numbers">Previous numbers</p>
          <div className="history-numbers">
            {remainingNumbers.map((number, index) => {
              const color = getRouletteColor(number);
              return (
                <div key={index} className={color}>
                  {number}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
