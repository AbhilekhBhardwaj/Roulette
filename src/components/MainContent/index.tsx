import React, { useState, useEffect } from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import Wheel from '../../Wheel';
import Board from '../../Board';
import { NumberHistory } from '../NumberHistory';
import { MergedBar } from '../MergedBar';
import { MobileGameLayout } from '../MobileGameLayout';
import { Button } from '@mantine/core';
import { GameStages } from '../../types';

export const MainContent: React.FC = () => {
  const { rouletteData, number, spinTrigger, chipsData, history, placeBet, clearBets, undoLastBet, totalBet, lastWin, stage, spinWheel, clearWinningNumber } = useRoulette();
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const canPlaceBets = stage === GameStages.PLACE_BET;
  
  // If mobile, use the mobile layout
  if (isMobile) {
    return <MobileGameLayout />;
  }
  
  // Get number color (red/black/green)
  const getNumberColor = (num: number) => {
    if (num === 0) return 'green';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  return (
    <div className="game-content">
      <div className="wheel-section">
        <div className="wheel-and-last-win">
          <div className="roulette-wheel-wrapper">
            <Wheel
              rouletteData={rouletteData}
              number={spinTrigger}
              onClearBets={clearBets}
              totalBet={totalBet}
              lastWin={lastWin}
            />
          </div>
          
          {/* Number History - Below Wheel */}
          <NumberHistory history={history} />
        </div>
        
        <div className="merged-bar-and-button">
          <MergedBar />
          
          {/* Place Bet Button - Below Merged Bar */}
          <div className="action-button-below-merged">
            <Button
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              size="lg"
              onClick={spinWheel}
              disabled={!canPlaceBets}
            >
              Place Bet
            </Button>
          </div>
        </div>
      </div>
      
      <Board
        onCellClick={placeBet}
        onClearBets={clearBets}
        onUndoBet={undoLastBet}
        chipsData={chipsData}
        rouletteData={rouletteData}
      />
      
      {/* Winning Number Display - Centered between wheel and merged bar */}
      {number.next && (
        <div className="winning-number-display">
          <button 
            className="close-winning-number" 
            onClick={clearWinningNumber}
          >
            ✕
          </button>
          <div className="winning-number-label">WINNING NUMBER</div>
          <div className={`winning-number ${getNumberColor(parseInt(number.next))}`}>
            {number.next}
          </div>
          {/* Profit Calculation Display */}
          <div className="profit-display">
            <div className="profit-multiplier">
              {lastWin > 0 && totalBet > 0 ? ((totalBet + lastWin) / totalBet).toFixed(2) : "0.00"}x
            </div>
            <div className="profit-amount">
              ${lastWin > 0 ? (totalBet + lastWin).toFixed(0) : "0"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};