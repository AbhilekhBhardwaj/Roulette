import React from 'react';
import { Button } from '@mantine/core';
import { GameStages } from '../types';

interface GameActionsProps {
  stage: GameStages;
  onClearBets: () => void;
  onPlaceBet: () => void;
  disabled?: boolean;
}

export const GameActions: React.FC<GameActionsProps> = ({
  stage,
  onClearBets,
  onPlaceBet,
  disabled = false
}) => {
  const canPlaceBets = stage === GameStages.PLACE_BET;

  return (
    <div className="roulette-actions">
      <ul>
        <li>
          <Button
            variant="gradient"
            gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            size="xl"
            onClick={onClearBets}
            disabled={disabled || !canPlaceBets}
          >
            Clear Bet
          </Button>
        </li>
        <li>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            size="xl"
            onClick={onPlaceBet}
            disabled={disabled || !canPlaceBets}
          >
            Place Bet
          </Button>
        </li>
      </ul>
    </div>
  );
};
