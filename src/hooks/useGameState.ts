import { useState, useCallback } from 'react';
import { GameStages } from '../types';

const INITIAL_BALANCE = 1000;

export const useGameState = () => {
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [lastWin, setLastWin] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [stage, setStage] = useState<GameStages>(GameStages.PLACE_BET);

  const updateBalance = useCallback((newBalance: number) => {
    setBalance(newBalance);
  }, []);

  const updateLastWin = useCallback((winAmount: number) => {
    setLastWin(winAmount);
  }, []);

  const addToHistory = useCallback((winningNumber: number) => {
    setHistory(prev => [winningNumber, ...prev].slice(0, 10));
  }, []);

  const setGameStage = useCallback((newStage: GameStages) => {
    setStage(newStage);
  }, []);

  return {
    balance,
    lastWin,
    history,
    stage,
    updateBalance,
    updateLastWin,
    addToHistory,
    setGameStage
  };
};
