import { useGameState } from './useGameState';
import { useChips } from './useChips';
import { useWheel } from './useWheel';

export const useRouletteLogic = () => {
  const gameState = useGameState();
  const chips = useChips();
  const wheel = useWheel({
    balance: gameState.balance,
    placedChips: chips.placedChips,
    getTotalBet: chips.getTotalBet,
    updateBalance: gameState.updateBalance,
    updateLastWin: gameState.updateLastWin,
    addToHistory: gameState.addToHistory,
    setGameStage: gameState.setGameStage,
    clearBets: chips.clearBets
  });

  return {
    // State
    rouletteData: wheel.rouletteData,
    number: wheel.number,
    chipsData: {
      selectedChip: chips.selectedChip,
      placedChips: chips.placedChips
    },
    history: gameState.history,
    stage: gameState.stage,
    balance: gameState.balance,
    lastWin: gameState.lastWin,
    totalBet: chips.getTotalBet(),
    
    // Actions
    selectChip: chips.selectChip,
    placeBet: chips.placeBet,
    clearBets: chips.clearBets,
    undoLastBet: chips.undoLastBet,
    spinWheel: wheel.spinWheel,
    setGameStage: gameState.setGameStage
  };
};
