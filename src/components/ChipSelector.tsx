import React from 'react';

interface ChipSelectorProps {
  selectedChip: number;
  onChipSelect: (chipValue: number) => void;
  availableChips?: number[];
}

const DEFAULT_CHIPS = [5, 10, 20, 100];

export const ChipSelector: React.FC<ChipSelectorProps> = ({ 
  selectedChip, 
  onChipSelect,
  availableChips = DEFAULT_CHIPS 
}) => {
  return (
    <div className="quick-select">
      <div className="quick-select-header">
        <span className="quick-select-label">Select Chip Value:</span>
        <span className="help-tooltip" title="Choose the value of chips you want to place on the betting board">ⓘ</span>
      </div>
      {availableChips.map(chipValue => (
        <button
          key={chipValue}
          className={selectedChip === chipValue ? "selected" : ""}
          onClick={() => onChipSelect(chipValue)}
        >
          ${chipValue}
        </button>
      ))}
    </div>
  );
};
