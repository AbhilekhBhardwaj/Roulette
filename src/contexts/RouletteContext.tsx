import React, { createContext, useContext, ReactNode } from 'react';
import { useRouletteLogic } from '../hooks/useRouletteLogic';
import { RouletteState, GameStages, Item, PlacedChip } from '../types';

// Define the context type based on what useRouletteLogic returns
interface RouletteContextType {
  // State
  rouletteData: {
    numbers: number[];
  };
  number: {
    next: string | null;
  };
  spinTrigger: {
    next: string | null;
  };
  chipsData: {
    selectedChip: number;
    placedChips: Map<string, PlacedChip>;
  };
  history: number[];
  stage: GameStages;
  balance: number;
  lastWin: number;
  totalBet: number;
  
  // Actions
  selectChip: (chipValue: number) => void;
  placeBet: (item: Item) => void;
  clearBets: () => void;
  undoLastBet: () => void;
  spinWheel: () => void;
  setGameStage: (stage: GameStages) => void;
  clearWinningNumber: () => void;
}

// Create the context with null as default
const RouletteContext = createContext<RouletteContextType | null>(null);

// Provider component props
interface RouletteProviderProps {
  children: ReactNode;
}

// Provider component that wraps the app and provides roulette logic
export const RouletteProvider: React.FC<RouletteProviderProps> = ({ children }) => {
  const rouletteLogic = useRouletteLogic();
  
  return (
    <RouletteContext.Provider value={rouletteLogic}>
      {children}
    </RouletteContext.Provider>
  );
};

// Custom hook to use the roulette context
export const useRoulette = (): RouletteContextType => {
  const context = useContext(RouletteContext);
  
  if (!context) {
    throw new Error('useRoulette must be used within a RouletteProvider');
  }
  
  return context;
};

// Export the context for advanced usage if needed
export { RouletteContext };
