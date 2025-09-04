import React from 'react';
import { useRoulette } from '../contexts/RouletteContext';

// Import chip images
import chipBlack from '../assets/chip_black.png';
import chipBlue from '../assets/chip_blue.png';
import chipOrange from '../assets/chip_orange.png';
import chipPurple from '../assets/chip_purple.png';

// Map chip values to images
const CHIP_CONFIG = [
  { value: 5, image: chipBlack, alt: '$5 Chip' },
  { value: 10, image: chipBlue, alt: '$10 Chip' },
  { value: 20, image: chipOrange, alt: '$20 Chip' },
  { value: 100, image: chipPurple, alt: '$100 Chip' }
];

export const ChipSelector: React.FC = () => {
  const { chipsData, selectChip } = useRoulette();
  
  return (
    <div className="quick-select">
      <div className="quick-select-header">
        <span className="quick-select-label">Select Chip Value:</span>
        <span className="help-tooltip" title="Choose the value of chips you want to place on the betting board">ⓘ</span>
      </div>
      {CHIP_CONFIG.map(chip => (
        <button
          key={chip.value}
          className={`chip-selector-btn ${chipsData.selectedChip === chip.value ? "selected" : ""}`}
          onClick={() => selectChip(chip.value)}
          title={chip.alt}
        >
          <img src={chip.image} alt={chip.alt} className="chip-image" />
          <span className="chip-value">${chip.value}</span>
        </button>
      ))}
    </div>
  );
};
