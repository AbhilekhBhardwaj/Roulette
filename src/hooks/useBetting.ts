import { useMemo } from 'react';
import { PlacedChip, ValueType } from '../types';
import { generateCellKey } from '../utils/rouletteUtils';

interface UseBettingProps {
  placedChips: Map<string, PlacedChip>;
  selectedChip: number;
}

export const useBetting = ({ placedChips, selectedChip }: UseBettingProps) => {
  // Get chips for specific betting areas
  const getChipsForArea = useMemo(() => {
    return (type: ValueType, value?: number) => {
      const item = { type, value: value || 0, valueSplit: [] };
      const key = generateCellKey(item);
      return placedChips.get(key);
    };
  }, [placedChips]);

  // Check if chip value is selected
  const isChipSelected = useMemo(() => {
    return (chipValue: number) => chipValue === selectedChip;
  }, [selectedChip]);

  // Get total bet amount
  const totalBetAmount = useMemo(() => {
    let total = 0;
    placedChips.forEach(chip => {
      total += chip.sum;
    });
    return total;
  }, [placedChips]);

  // Get chips for different betting areas
  const bettingAreas = useMemo(() => ({
    // Dozens
    firstDozen: getChipsForArea(ValueType.NUMBERS_1_12),
    secondDozen: getChipsForArea(ValueType.NUMBERS_2_12),
    thirdDozen: getChipsForArea(ValueType.NUMBERS_3_12),
    
    // High/Low
    low: getChipsForArea(ValueType.NUMBERS_1_18),
    high: getChipsForArea(ValueType.NUMBERS_19_36),
    
    // Colors
    red: getChipsForArea(ValueType.RED),
    black: getChipsForArea(ValueType.BLACK),
    
    // Even/Odd
    even: getChipsForArea(ValueType.EVEN),
    odd: getChipsForArea(ValueType.ODD)
  }), [getChipsForArea]);

  // Get chip classes for UI styling
  const getChipClasses = useMemo(() => {
    return (chipValue: number) => {
      const baseClasses = [`chip-${chipValue}`];
      if (isChipSelected(chipValue)) {
        baseClasses.push('chip-selected');
      }
      return baseClasses.join(' ');
    };
  }, [isChipSelected]);

  return {
    bettingAreas,
    totalBetAmount,
    isChipSelected,
    getChipClasses,
    getChipsForArea
  };
};
