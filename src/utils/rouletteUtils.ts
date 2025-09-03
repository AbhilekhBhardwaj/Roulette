import { ValueType, PlacedChip } from '../types';

// Roulette wheel numbers in order
export const ROULETTE_WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25,
  17, 34, 6, 27, 13, 36, 11,
  30, 8, 23, 10, 5, 24, 16, 33,
  1, 20, 14, 31, 9, 22, 18, 29,
  7, 28, 12, 35, 3, 26
];

// Black numbers on roulette wheel
export const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35];

// Red numbers on roulette wheel
export const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

/**
 * Get the color of a roulette number
 */
export const getRouletteColor = (number: number): 'red' | 'black' | 'green' => {
  if (number === 0) return 'green';
  if (BLACK_NUMBERS.includes(number)) return 'black';
  if (RED_NUMBERS.includes(number)) return 'red';
  return 'green';
};

/**
 * Generate a random roulette number (0-36)
 */
export const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 37);
};

/**
 * Calculate winnings based on placed chips and winning number
 */
export const calculateWinnings = (winningNumber: number, placedChips: PlacedChip[]): number => {
  let totalWin = 0;

  for (const placedChip of placedChips) {
    const { item, sum } = placedChip;
    const { type, value } = item;

    switch (type) {
      case ValueType.NUMBER:
        if (value === winningNumber) {
          totalWin += sum * 36; // 35:1 payout + original bet
        }
        break;

      case ValueType.RED:
        if (RED_NUMBERS.includes(winningNumber)) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.BLACK:
        if (BLACK_NUMBERS.includes(winningNumber)) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.EVEN:
        if (winningNumber !== 0 && winningNumber % 2 === 0) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.ODD:
        if (winningNumber !== 0 && winningNumber % 2 === 1) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.NUMBERS_1_18:
        if (winningNumber >= 1 && winningNumber <= 18) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.NUMBERS_19_36:
        if (winningNumber >= 19 && winningNumber <= 36) {
          totalWin += sum * 2; // 1:1 payout + original bet
        }
        break;

      case ValueType.NUMBERS_1_12:
        if (winningNumber >= 1 && winningNumber <= 12) {
          totalWin += sum * 3; // 2:1 payout + original bet
        }
        break;

      case ValueType.NUMBERS_2_12:
        if (winningNumber >= 13 && winningNumber <= 24) {
          totalWin += sum * 3; // 2:1 payout + original bet
        }
        break;

      case ValueType.NUMBERS_3_12:
        if (winningNumber >= 25 && winningNumber <= 36) {
          totalWin += sum * 3; // 2:1 payout + original bet
        }
        break;

      default:
        break;
    }
  }

  return totalWin;
};

/**
 * Generate cell key for chip placement
 */
export const generateCellKey = (item: any): string => {
  if (item.value !== undefined) {
    return `${item.type}:${item.value}`;
  }
  if (item.valueSplit !== undefined) {
    return `${item.type}:split:${item.valueSplit.join(',')}`;
  }
  return `${item.type}:empty`;
};

/**
 * Format currency display
 */
export const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};

/**
 * Get betting area label for display
 */
export const getBettingLabel = (type: ValueType, value?: number): string => {
  switch (type) {
    case ValueType.RED: return 'RED';
    case ValueType.BLACK: return 'BLACK';
    case ValueType.EVEN: return 'EVEN';
    case ValueType.ODD: return 'ODD';
    case ValueType.NUMBERS_1_18: return '1-18';
    case ValueType.NUMBERS_19_36: return '19-36';
    case ValueType.NUMBERS_1_12: return '1st 12';
    case ValueType.NUMBERS_2_12: return '2nd 12';
    case ValueType.NUMBERS_3_12: return '3rd 12';
    case ValueType.NUMBER: return value?.toString() || '';
    default: return '';
  }
};
