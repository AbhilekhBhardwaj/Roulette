import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import Wheel from '../../Wheel';
import Board from '../../Board';
import { ChipSelector } from '../ChipSelector';
import { GameStages } from '../../types';

export const MobileGameLayout: React.FC = () => {
  const { 
    rouletteData, 
    number, 
    spinTrigger, 
    chipsData, 
    history, 
    balance,
    totalBet,
    lastWin,
    placeBet, 
    clearBets, 
    stage, 
    spinWheel, 
    clearWinningNumber 
  } = useRoulette();
  
  const canPlaceBets = stage === GameStages.PLACE_BET;
  
  // Get number color (red/black/green)
  const getNumberColor = (num: number) => {
    if (num === 0) return 'green';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  const lastWinningNumber = history.length > 0 ? history[0] : null;

  return (
    <div className="mobile-game-container">
      {/* Mobile Stats Card */}
      <div className="mobile-stats-card">
        <div className="stat-item">
          <div className="stat-label">Balance</div>
          <div className="stat-value balance-value">${balance}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Total Bet</div>
          <div className="stat-value bet-value">${totalBet}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Last Win</div>
          <div className="stat-value win-value">${lastWin}</div>
        </div>
      </div>

      {/* Mobile Wheel Card */}
      <div className="mobile-wheel-card">
        <Wheel
          rouletteData={rouletteData}
          number={spinTrigger}
          onClearBets={clearBets}
          totalBet={totalBet}
          lastWin={lastWin}
        />
        
        {/* Last Winning Number */}
        <div className="mobile-last-winning">
          Last winning number: 
          {lastWinningNumber !== null ? (
            <span 
              className={`winning-number-display ${getNumberColor(lastWinningNumber)}`}
              style={{
                background: lastWinningNumber !== null && getNumberColor(lastWinningNumber) === 'red' 
                  ? 'linear-gradient(135deg, #DC143C, #B22222)'
                  : lastWinningNumber !== null && getNumberColor(lastWinningNumber) === 'black'
                  ? 'linear-gradient(135deg, #2F2F2F, #000000)'
                  : 'linear-gradient(135deg, #228B22, #32CD32)'
              }}
            >
              {lastWinningNumber}
            </span>
          ) : (
            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>No spins yet</span>
          )}
        </div>
      </div>

      {/* Mobile Chip Selector Card */}
      <div className="mobile-chip-card">
        <div className="mobile-chip-header">Select Chip</div>
        <ChipSelector />
      </div>

      {/* Mobile Betting Board Card */}
      <div className="mobile-board-card">
        <div className="mobile-board-header">Place Your Bets</div>
        <Board
          onCellClick={placeBet}
          onClearBets={clearBets}
          onUndoBet={() => {}} // Add undo functionality if needed
          chipsData={chipsData}
          rouletteData={rouletteData}
        />
      </div>

      {/* Mobile Action Buttons */}
      <div className="mobile-action-card">
        <button 
          className="mobile-action-btn clear"
          onClick={clearBets}
          disabled={!canPlaceBets}
        >
          Clear Bet
        </button>
        <button 
          className="mobile-action-btn place"
          onClick={spinWheel}
          disabled={!canPlaceBets || totalBet === 0}
        >
          Place Bet
        </button>
      </div>

      {/* Winning Number Popup - Mobile Optimized */}
      {number.next && (
        <div className="winning-number-display" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '15px',
          padding: '20px',
          border: '3px solid #d4af37',
          textAlign: 'center',
          maxWidth: '300px',
          width: '90%'
        }}>
          <button 
            className="close-winning-number" 
            onClick={clearWinningNumber}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: '#ff4757',
              border: '2px solid #ffffff',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          <div style={{ 
            color: '#d4af37', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px' 
          }}>
            Winning Number
          </div>
          <div 
            className={`winning-number ${number.next ? getNumberColor(parseInt(number.next)) : ''}`}
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '15px',
              background: number.next && getNumberColor(parseInt(number.next)) === 'red' 
                ? 'linear-gradient(135deg, #DC143C, #B22222)'
                : number.next && getNumberColor(parseInt(number.next)) === 'black'
                ? 'linear-gradient(135deg, #2F2F2F, #000000)'
                : 'linear-gradient(135deg, #228B22, #32CD32)'
            }}
          >
            {number.next}
          </div>
          {lastWin > 0 && (
            <div style={{
              background: 'rgba(255, 215, 0, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#ffd700', 
                marginBottom: '5px' 
              }}>
                {totalBet > 0 ? ((totalBet + lastWin) / totalBet).toFixed(2) : "0.00"}x
              </div>
              <div style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#ffffff' 
              }}>
                +${lastWin}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};