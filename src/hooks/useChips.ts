import { useState, useCallback } from 'react';
import { PlacedChip, Item } from '../types';
import { generateCellKey } from '../utils/rouletteUtils';

export const useChips = () => {
  const [selectedChip, setSelectedChip] = useState<number>(5);
  const [placedChips, setPlacedChips] = useState<Map<string, PlacedChip>>(new Map());
  const [chipOrder, setChipOrder] = useState<string[]>([]);

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

    // Track the order of placed chips
    setChipOrder(prev => [...prev, key]);
  }, [selectedChip]);

  const clearBets = useCallback(() => {
    setPlacedChips(new Map<string, PlacedChip>());
    setChipOrder([]);
  }, []);

  const undoLastBet = useCallback(() => {
    if (chipOrder.length === 0) return;

    const lastKey = chipOrder[chipOrder.length - 1];
    
    setPlacedChips(prev => {
      const currentChips = new Map(prev);
      const existing = currentChips.get(lastKey);
      
      if (existing) {
        if (existing.sum > selectedChip) {
          // Reduce the bet amount by the selected chip value
          const updatedChip: PlacedChip = {
            ...existing,
            sum: existing.sum - selectedChip
          };
          currentChips.set(lastKey, updatedChip);
        } else {
          // Remove the chip entirely if sum would be 0 or negative
          currentChips.delete(lastKey);
        }
      }
      
      return currentChips;
    });

    // Remove the last chip from order
    setChipOrder(prev => prev.slice(0, -1));
  }, [chipOrder, selectedChip]);

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
    undoLastBet,
    getTotalBet
  };
};
