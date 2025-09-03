import { useState, useCallback } from 'react';
import { PlacedChip, Item } from '../types';
import { generateCellKey } from '../utils/rouletteUtils';

export const useChips = () => {
  const [selectedChip, setSelectedChip] = useState<number>(5);
  const [placedChips, setPlacedChips] = useState<Map<string, PlacedChip>>(new Map());

  const selectChip = useCallback((chipValue: number) => {
    setSelectedChip(chipValue);
  }, []);

  const placeBet = useCallback((item: Item) => {
    console.log('Hook placeBet called with:', item);
    
    if (!selectedChip || selectedChip <= 0) {
      console.log('No chip selected, chipValue:', selectedChip);
      return;
    }

    const key = generateCellKey(item);
    console.log('Generated key in hook:', key);
    
    setPlacedChips(prev => {
      const currentChips = new Map(prev);
      const existing = currentChips.get(key);
      
      const newChip: PlacedChip = {
        item,
        sum: existing ? existing.sum + selectedChip : selectedChip
      };

      currentChips.set(key, newChip);
      console.log('Placing bet in hook:', key, newChip);
      
      return currentChips;
    });
  }, [selectedChip]);

  const clearBets = useCallback(() => {
    setPlacedChips(new Map<string, PlacedChip>());
  }, []);

  const getTotalBet = useCallback((): number => {
    let total = 0;
    placedChips.forEach(chip => {
      total += chip.sum;
    });
    return total;
  }, [placedChips]);

  return {
    selectedChip,
    placedChips,
    selectChip,
    placeBet,
    clearBets,
    getTotalBet
  };
};
