import React from 'react';
import { getRouletteColor } from '../utils/rouletteUtils';

interface NumberHistoryProps {
  history: number[];
  maxNumbers?: number;
}

export const NumberHistory: React.FC<NumberHistoryProps> = ({ 
  history, 
  maxNumbers = 5 
}) => {
  const displayHistory = history.slice(0, maxNumbers);

  if (displayHistory.length === 0) {
    return (
      <div className="winner-history">
        <h3>📊 Number History</h3>
        <div className="last-winning-container">
          <p className="history-subtitle">Last winning number:</p>
          <span className="no-spins">No spins yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="winner-history">
      <h3>📊 Number History</h3>
      <div className="last-winning-container">
        <p className="history-subtitle">Last winning number:</p>
        <div className="horizontal-numbers">
          {displayHistory.map((number, index) => {
            const color = getRouletteColor(number);
            return (
              <div 
                key={index} 
                className={`winning-number-horizontal ${color} ${index === 0 ? 'latest' : ''}`}
                style={{
                  fontSize: index === 0 ? '20px' : `${18 - index * 2}px`,
                  width: index === 0 ? '40px' : `${36 - index * 4}px`,
                  height: index === 0 ? '40px' : `${36 - index * 4}px`
                }}
              >
                {number}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
