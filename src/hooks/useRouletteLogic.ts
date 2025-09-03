import { useState, useCallback } from 'react';
import { RouletteState, GameStages, Item, PlacedChip } from '../types';
import { 
  ROULETTE_WHEEL_NUMBERS, 
  generateRandomNumber, 
  calculateWinnings, 
  generateCellKey 
} from '../utils/rouletteUtils';

const INITIAL_BALANCE = 1000;

export const useRouletteLogic = () => {
  const [state, setState] = useState<RouletteState>({
    rouletteData: {
      numbers: ROULETTE_WHEEL_NUMBERS
    },
    chipsData: {
      selectedChip: 5,
      placedChips: new Map<string, PlacedChip>()
    },
    number: {
      next: null
    },
    winners: [],
    history: [],
    stage: GameStages.PLACE_BET,
    username: "",
    endTime: 25,
    progressCountdown: 0,
    time_remaining: 25,
    balance: INITIAL_BALANCE,
    lastWin: 0
  });

  // Select chip value
  const selectChip = useCallback((chipValue: number) => {
    setState(prev => ({
      ...prev,
      chipsData: {
        ...prev.chipsData,
        selectedChip: chipValue
      }
    }));
  }, []);

  // Place chip on betting area
  const placeBet = useCallback((item: Item) => {
    console.log('Hook placeBet called with:', item);
    
    setState(prev => {
      const chipValue = prev.chipsData.selectedChip;
      if (!chipValue || chipValue <= 0) {
        console.log('No chip selected, chipValue:', chipValue);
        return prev;
      }

      const key = generateCellKey(item);
      console.log('Generated key in hook:', key);
      
      const currentChips = new Map(prev.chipsData.placedChips);
      const existing = currentChips.get(key);
      
      const newChip: PlacedChip = {
        item,
        sum: existing ? existing.sum + chipValue : chipValue
      };

      currentChips.set(key, newChip);
      console.log('Placing bet in hook:', key, newChip);

      return {
        ...prev,
        chipsData: {
          ...prev.chipsData,
          placedChips: currentChips
        }
      };
    });
  }, []);

  // Clear all bets
  const clearBets = useCallback(() => {
    setState(prev => ({
      ...prev,
      chipsData: {
        ...prev.chipsData,
        placedChips: new Map<string, PlacedChip>()
      }
    }));
  }, []);

  // Calculate total bet amount
  const getTotalBet = useCallback((): number => {
    let total = 0;
    state.chipsData.placedChips.forEach(chip => {
      total += chip.sum;
    });
    return total;
  }, [state.chipsData.placedChips]);

  // Spin the wheel and calculate results
  const spinWheel = useCallback(() => {
    const totalBet = getTotalBet();
    
    // Check if player has enough balance
    if (totalBet > state.balance) {
      console.warn('Insufficient balance');
      return;
    }

    // Generate winning number
    const winningNumber = generateRandomNumber();
    
    // Calculate winnings
    const placedChipsArray = Array.from(state.chipsData.placedChips.values());
    const winnings = calculateWinnings(winningNumber, placedChipsArray);

    setState(prev => ({
      ...prev,
      number: { next: winningNumber.toString() },
      balance: prev.balance - totalBet + winnings,
      lastWin: winnings,
      history: [winningNumber, ...prev.history].slice(0, 10),
      stage: GameStages.NO_MORE_BETS,
      chipsData: {
        selectedChip: prev.chipsData.selectedChip,
        placedChips: new Map<string, PlacedChip>()
      }
    }));

    // Reset to place bet stage after animation
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        stage: GameStages.PLACE_BET
      }));
    }, 3000);
  }, [state.balance, state.chipsData.placedChips, getTotalBet]);

  // Set game stage
  const setGameStage = useCallback((stage: GameStages) => {
    setState(prev => ({
      ...prev,
      stage
    }));
  }, []);

  return {
    // State
    ...state,
    totalBet: getTotalBet(),
    
    // Actions
    selectChip,
    placeBet,
    clearBets,
    spinWheel,
    setGameStage
  };
};
