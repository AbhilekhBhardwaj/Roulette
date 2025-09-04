import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import Wheel from '../../Wheel';
import Board from '../../Board';
import { NumberHistory } from '../NumberHistory';
import { LeftBar } from '../LeftBar';
import { RightBar } from '../RightBar';
import { Button } from '@mantine/core';
import { GameStages } from '../../types';

export const MainContent: React.FC = () => {
  const { rouletteData, number, chipsData, history, placeBet, clearBets, totalBet, lastWin, stage, spinWheel } = useRoulette();
  
  const canPlaceBets = stage === GameStages.PLACE_BET;

  return (
    <div className="game-content">
      <div className="wheel-section">
        <LeftBar />
        
        <div className="wheel-and-buttons">
          {/* Clear Bet Button - Close to Wheel */}
          <div className="action-button-left">
            <Button
              variant="gradient"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
              size="lg"
              onClick={clearBets}
              disabled={!canPlaceBets}
            >
              Clear Bet
            </Button>
          </div>
          
          <div className="roulette-wheel-wrapper">
            <Wheel
              rouletteData={rouletteData}
              number={number}
              onClearBets={clearBets}
              totalBet={totalBet}
              lastWin={lastWin}
            />
          </div>
          
          {/* Place Bet Button - Close to Wheel */}
          <div className="action-button-right">
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
        
        <RightBar />
      </div>
      
      <NumberHistory history={history} />
      
      <Board
        onCellClick={placeBet}
        chipsData={chipsData}
        rouletteData={rouletteData}
      />
    </div>
  );
};
