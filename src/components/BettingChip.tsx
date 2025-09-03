import React from 'react';
import { PlacedChip } from '../types';

interface BettingChipProps {
  currentItemChips?: PlacedChip;
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
}

export const BettingChip: React.FC<BettingChipProps> = ({
  currentItemChips,
  leftMin = -10,
  leftMax = 10,
  topMin = -30,
  topMax = 0
}) => {
  if (!currentItemChips) {
    return null;
  }

  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const getChipClasses = (chipValue: number) => {
    return `chip-${chipValue}-placed chipValueImage`;
  };

  const generateChips = () => {
    const chips = [];
    let total = 0;
    const chipData = currentItemChips;

    while (total < chipData.sum) {
      let currentChip = 100;
      const totalSum = chipData.sum - total;

      if (totalSum >= 100) {
        currentChip = 100;
      } else if (totalSum >= 20) {
        currentChip = 20;
      } else if (totalSum >= 10) {
        currentChip = 10;
      } else {
        currentChip = 5;
      }

      const calc = totalSum - (totalSum % currentChip);
      total += calc;
      const currentChipPlaced = calc / currentChip;

      for (let i = 0; i < currentChipPlaced; i++) {
        const key = `${currentItemChips.item.type}_${currentItemChips.item.value}_${currentChip}_${i}`;
        const style = {
          top: `${randomNumber(topMin, topMax)}px`,
          left: `${randomNumber(leftMin, leftMax)}px`
        };

        chips.push(
          <div
            key={key}
            style={style}
            className={getChipClasses(currentChip)}
          />
        );
      }
    }

    return chips;
  };

  return (
    <div className="chipValue">
      {generateChips()}
    </div>
  );
};
