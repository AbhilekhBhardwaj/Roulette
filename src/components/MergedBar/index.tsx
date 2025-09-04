import React from 'react';
import { useRoulette } from '../../contexts/RouletteContext';
import { formatCurrency } from '../../utils/rouletteUtils';

// Import chip images
import chipBlack from '../../assets/chip_black.png';
import chipBlue from '../../assets/chip_blue.png';
import chipOrange from '../../assets/chip_orange.png';
import chipPurple from '../../assets/chip_purple.png';

// Map chip values to images
const CHIP_CONFIG = [
  { value: 5, image: chipBlack, alt: '$5 Chip' },
  { value: 10, image: chipBlue, alt: '$10 Chip' },
  { value: 25, image: chipOrange, alt: '$25 Chip' },
  { value: 100, image: chipPurple, alt: '$100 Chip' }
];

export const MergedBar: React.FC = () => {
  const { balance, totalBet, lastWin, chipsData, selectChip } = useRoulette();

  return (
    <div className="merged-bar">
      {/* Balance Section */}
      <div className="merged-section balance-section">
        <span className="merged-label">Balance</span>
        <strong className="merged-value balance-value">{formatCurrency(balance)}</strong>
      </div>
      
      {/* Total Bet Section */}
      <div className="merged-section bet-section">
        <span className="merged-label">Total Bet</span>
        <strong className="merged-value bet-value">{formatCurrency(totalBet)}</strong>
      </div>
      
      {/* Chip Selector Section */}
      <div className="merged-section chip-section">
        <span className="merged-label">Select Chip</span>
        <div className="chip-selector-horizontal">
          {CHIP_CONFIG.map(chip => (
            <button
              key={chip.value}
              className={`chip-selector-btn-horizontal ${chipsData.selectedChip === chip.value ? "selected" : ""}`}
              onClick={() => selectChip(chip.value)}
              title={chip.alt}
            >
              <img src={chip.image} alt={chip.alt} className="chip-image-horizontal" />
              <span className="chip-value-horizontal">${chip.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
