import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import Wheel from '../../Wheel';
import Board from '../../Board';
import { NumberHistory } from '../NumberHistory';

export const MainContent: React.FC = () => {
  const { rouletteData, number, chipsData, history, placeBet, clearBets } = useRoulette();

  return (
    <div className="game-content">
      <div className="roulette-wheel-wrapper">
        <Wheel
          rouletteData={rouletteData}
          number={number}
          onClearBets={clearBets}
        />
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
