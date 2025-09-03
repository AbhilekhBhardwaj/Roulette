import React from 'react';
import { useRoulette } from '../contexts/RouletteContext';

// Remove the props interface since we'll get data from context
const DEFAULT_CHIPS = [5, 10, 20, 100];

export const ChipSelector: React.FC = () => {
  const { chipsData, selectChip } = useRoulette();
  
  return (
    <div className="quick-select">
      <div className="quick-select-header">
        <span className="quick-select-label">Select Chip Value:</span>
        <span className="help-tooltip" title="Choose the value of chips you want to place on the betting board">ⓘ</span>
      </div>
      {DEFAULT_CHIPS.map(chipValue => (
        <button
          key={chipValue}
          className={chipsData.selectedChip === chipValue ? "selected" : ""}
          onClick={() => selectChip(chipValue)}
        >
          ${chipValue}
        </button>
      ))}
    </div>
  );
};
