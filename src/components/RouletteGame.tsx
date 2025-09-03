import React from 'react';
import { TopBar } from './TopBar';
import Wheel from '../Wheel';
import Board from '../Board';
import { NumberHistory } from './NumberHistory';
import { GameActions } from './GameActions';
import { useRouletteLogic } from '../hooks/useRouletteLogic';

export const RouletteGame: React.FC = () => {
  const {
    // State
    rouletteData,
    number,
    chipsData,
    history,
    stage,
    balance,
    lastWin,
    totalBet,
    
    // Actions
    selectChip,
    placeBet,
    clearBets,
    spinWheel
  } = useRouletteLogic();

  return (
    <div className="roulette-game">
      <TopBar
        balance={balance}
        totalBet={totalBet}
        lastWin={lastWin}
        selectedChip={chipsData.selectedChip}
        onChipSelect={selectChip}
      />
      
      <div className="game-content">
        <div className="roulette-wheel-wrapper">
          <Wheel
            rouletteData={rouletteData}
            number={number}
          />
        </div>
        
        <NumberHistory history={history} />
        
        <Board
          onCellClick={placeBet}
          chipsData={chipsData}
          rouletteData={rouletteData}
        />
      </div>
      
      <GameActions
        stage={stage}
        onClearBets={clearBets}
        onPlaceBet={spinWheel}
      />
    </div>
  );
};