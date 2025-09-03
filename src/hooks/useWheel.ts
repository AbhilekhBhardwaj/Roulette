import { useState, useCallback } from 'react';
import { WheelNumber, PlacedChip, GameStages } from '../types';
import { generateRandomNumber, calculateWinnings, ROULETTE_WHEEL_NUMBERS } from '../utils/rouletteUtils';

interface UseWheelProps {
  balance: number;
  placedChips: Map<string, PlacedChip>;
  getTotalBet: () => number;
  updateBalance: (balance: number) => void;
  updateLastWin: (winAmount: number) => void;
  addToHistory: (number: number) => void;
  setGameStage: (stage: GameStages) => void;
  clearBets: () => void;
}

export const useWheel = ({
  balance,
  placedChips,
  getTotalBet,
  updateBalance,
  updateLastWin,
  addToHistory,
  setGameStage,
  clearBets
}: UseWheelProps) => {
  const [number, setNumber] = useState<WheelNumber>({ next: null });
  
  const rouletteData = {
    numbers: ROULETTE_WHEEL_NUMBERS
  };

  const spinWheel = useCallback(() => {
    const totalBet = getTotalBet();
    
    // Check if player has enough balance
    if (totalBet > balance) {
      console.warn('Insufficient balance');
      return;
    }

    // Generate winning number
    const winningNumber = generateRandomNumber();
    
    // Calculate winnings
    const placedChipsArray = Array.from(placedChips.values());
    const winnings = calculateWinnings(winningNumber, placedChipsArray);

    // Update all game state
    setNumber({ next: winningNumber.toString() });
    updateBalance(balance - totalBet + winnings);
    updateLastWin(winnings);
    addToHistory(winningNumber);
    setGameStage(GameStages.NO_MORE_BETS);
    clearBets();

    // Reset to place bet stage after animation
    setTimeout(() => {
      setGameStage(GameStages.PLACE_BET);
    }, 3000);
  }, [balance, placedChips, getTotalBet, updateBalance, updateLastWin, addToHistory, setGameStage, clearBets]);

  return {
    number,
    rouletteData,
    spinWheel
  };
};
