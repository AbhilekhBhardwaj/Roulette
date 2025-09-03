import React from 'react';
import { RouletteData, WheelNumber } from '../types';

interface RouletteWheelProps {
  rouletteData: RouletteData;
  number: WheelNumber;
  className?: string;
}

export const RouletteWheel: React.FC<RouletteWheelProps> = ({ 
  rouletteData, 
  number,
  className = "roulette-wheel"
}) => {
  return (
    <div className={className}>
      <div className="layer-2"></div>
      <div className="layer-3"></div>
      <div className="layer-4"></div>
      <div className="layer-5"></div>
      <div className="ball-container">
        <div className="ball"></div>
      </div>
      {/* SVG overlay for number selection if needed */}
      <svg width="100%" height="100%">
        {/* Wheel segments can be added here if interactive */}
      </svg>
    </div>
  );
};
