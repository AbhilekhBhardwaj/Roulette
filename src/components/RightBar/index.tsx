import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';

// Import chip images
import chipBlack from '../../assets/chip_black.png';
import chipBlue from '../../assets/chip_blue.png';
import chipOrange from '../../assets/chip_orange.png';
import chipPurple from '../../assets/chip_purple.png';

// Map chip values to images
const CHIP_CONFIG = [
  { value: 5, image: chipBlack, alt: '$5 Chip' },
  { value: 10, image: chipBlue, alt: '$10 Chip' },
  { value: 20, image: chipOrange, alt: '$20 Chip' },
  { value: 100, image: chipPurple, alt: '$100 Chip' }
];

export const RightBar: React.FC = () => {
  const { chipsData, selectChip } = useRoulette();
  
  return (
    <div className="right-bar">
      <div className="chip-selector-header">
        <span className="chip-selector-label">Select Chip:</span>
      </div>
      <div className="chip-selector-vertical">
        {CHIP_CONFIG.map(chip => (
          <button
            key={chip.value}
            className={`chip-selector-btn-vertical ${chipsData.selectedChip === chip.value ? "selected" : ""}`}
            onClick={() => selectChip(chip.value)}
            title={chip.alt}
          >
            <img src={chip.image} alt={chip.alt} className="chip-image-vertical" />
            <span className="chip-value-vertical">${chip.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
