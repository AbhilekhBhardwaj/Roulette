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
  const [spinTrigger, setSpinTrigger] = useState<WheelNumber>({ next: null });
  
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

    // Update game state immediately (except winning number display)
    updateBalance(balance - totalBet + winnings);
    updateLastWin(winnings);
    addToHistory(winningNumber);
    setGameStage(GameStages.NO_MORE_BETS);

    // Trigger wheel spin immediately
    setSpinTrigger({ next: winningNumber.toString() });

    // Show winning number popup after 5 seconds
    setTimeout(() => {
      setNumber({ next: winningNumber.toString() });
    }, 5000);

    // Reset to place bet stage after animation
    setTimeout(() => {
      setGameStage(GameStages.PLACE_BET);
    }, 3000);
  }, [balance, placedChips, getTotalBet, updateBalance, updateLastWin, addToHistory, setGameStage, clearBets]);

  const clearWinningNumber = useCallback(() => {
    setNumber({ next: null });
  }, []);

  return {
    number,
    spinTrigger,
    rouletteData,
    spinWheel,
    clearWinningNumber
  };
};
