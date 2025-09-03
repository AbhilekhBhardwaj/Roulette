import { ValueType, Item } from '../types';

/**
 * Generate the numbers grid for the roulette board
 */
export const generateNumbersGrid = (): Item[][] => {
  const colList: Array<Array<Item>> = [];
  const difference = 3;

  for (let i = 1; i <= 5; i++) {
    const rowList: Array<Item> = [];
    let startNumberSub = 0;
    if (i === 3) {
      startNumberSub = 1;
    } else if (i === 5) {
      startNumberSub = 2;
    }

    let nextStartNumberSub = 0;
    if (i + 1 === 3) {
      nextStartNumberSub = 1;
    } else if (i + 1 === 5) {
      nextStartNumberSub = 2;
    }

    let prevStartNumberSub = 0;
    if (i - 1 === 3) {
      prevStartNumberSub = 1;
    } else if (i - 1 === 5) {
      prevStartNumberSub = 2;
    }

    if (i === 1) {
      const cell: Item = { type: ValueType.NUMBER, value: 0, valueSplit: [] };
      rowList.push(cell);
    }

    for (let j = 1; j <= 26; j++) {
      let cell: Item = { type: ValueType.EMPTY, value: 0, valueSplit: [] };

      if (j > 24) {
        cell.type = ValueType.EMPTY;
        rowList.push(cell);
        continue;
      }

      // 2, 4 mid splits
      if (i % 2 === 0) {
        if (j === 1) {
          const leftNumber = 0;
          const topNumber = difference - prevStartNumberSub;
          const bottomNumber = difference - nextStartNumberSub;

          cell.type = ValueType.TRIPLE_SPLIT;
          cell.valueSplit = [leftNumber, topNumber, bottomNumber];
          rowList.push(cell);
        } else {
          if (j % 2 === 0) {
            const topNumber = ((j - 2) / 2) * difference + difference - prevStartNumberSub;
            const bottomNumber = ((j - 2) / 2) * difference + difference - nextStartNumberSub;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [topNumber, bottomNumber];
            rowList.push(cell);
          } else {
            const leftNumber = ((j - 1) / 2) * difference - prevStartNumberSub;
            const rightNumber = leftNumber + difference;
            const bottomLeftNumber = ((j - 1) / 2) * difference - nextStartNumberSub;
            const bottomRightNumber = bottomLeftNumber + difference;
            cell.type = ValueType.QUAD_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber, bottomLeftNumber, bottomRightNumber];
            rowList.push(cell);
          }
        }
      } else {
        // 1, 3, 5 normal rows
        if (j === 1) {
          const leftNumber = 0;
          const rightNumber = leftNumber + difference;
          cell.type = ValueType.DOUBLE_SPLIT;
          cell.valueSplit = [leftNumber, rightNumber];
          rowList.push(cell);
        } else {
          if (j % 2 === 0) {
            const currentNumber = ((j - 2) / 2) * difference + difference - startNumberSub;
            cell.type = ValueType.NUMBER;
            cell.value = currentNumber;
            rowList.push(cell);
          } else {
            const leftNumber = ((j - 1) / 2) * difference - startNumberSub;
            const rightNumber = leftNumber + difference;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber];
            rowList.push(cell);
          }
        }
      }
    }
    colList.push(rowList);
  }

  return colList;
};

/**
 * Create betting area items for outside bets
 */
export const createBettingAreas = () => {
  return {
    dozens: {
      first: { type: ValueType.NUMBERS_1_12, value: 0, valueSplit: [] },
      second: { type: ValueType.NUMBERS_2_12, value: 0, valueSplit: [] },
      third: { type: ValueType.NUMBERS_3_12, value: 0, valueSplit: [] }
    },
    ranges: {
      low: { type: ValueType.NUMBERS_1_18, value: 0, valueSplit: [] },
      high: { type: ValueType.NUMBERS_19_36, value: 0, valueSplit: [] }
    },
    colors: {
      red: { type: ValueType.RED, value: 0, valueSplit: [] },
      black: { type: ValueType.BLACK, value: 0, valueSplit: [] }
    },
    parity: {
      even: { type: ValueType.EVEN, value: 0, valueSplit: [] },
      odd: { type: ValueType.ODD, value: 0, valueSplit: [] }
    }
  };
};
