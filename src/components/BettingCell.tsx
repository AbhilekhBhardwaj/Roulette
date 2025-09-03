import React from 'react';
import { Item, PlacedChip } from '../types';
import { BettingChip } from './BettingChip';
import { getBettingLabel } from '../utils/rouletteUtils';

interface BettingCellProps {
  cell: Item;
  currentItemChips?: PlacedChip;
  cellClass?: string;
  rowSpan?: number;
  colSpan?: number;
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
  onClick: (cell: Item) => void;
}

export const BettingCell: React.FC<BettingCellProps> = ({
  cell,
  currentItemChips,
  cellClass = '',
  rowSpan = 1,
  colSpan = 1,
  leftMin,
  leftMax,
  topMin,
  topMax,
  onClick
}) => {
  const bettingLabel = getBettingLabel(cell.type, cell.value);
  
  const sum = currentItemChips?.sum || 0;
  const left = leftMin && leftMax ? leftMin + (leftMax - leftMin) / 2 : 0;
  const top = topMin && topMax ? topMin + (topMax - topMin) / 2 : -15;
  
  const sumStyle = {
    top: `${top}px`,
    left: `${left}px`
  };

  return (
    <td
      className={cellClass}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onClick={() => onClick(cell)}
    >
      <BettingChip
        currentItemChips={currentItemChips}
        leftMin={leftMin}
        leftMax={leftMax}
        topMin={topMin}
        topMax={topMax}
      />
      <div className="chipValue">
        {sum > 0 && (
          <div style={sumStyle} className="chipSum">
            {sum}
          </div>
        )}
        {bettingLabel && (
          <div className="betting-cell-label">
            {bettingLabel}
          </div>
        )}
      </div>
    </td>
  );
};
