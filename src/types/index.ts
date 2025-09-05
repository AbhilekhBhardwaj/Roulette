export enum ValueType {
  NUMBER,
  NUMBERS_1_12,
  NUMBERS_2_12,
  NUMBERS_3_12,
  NUMBERS_1_18,
  NUMBERS_19_36,
  EVEN,
  ODD,
  RED,
  BLACK,
  COLUMN_1,
  COLUMN_2,
  COLUMN_3,
  DOUBLE_SPLIT,
  QUAD_SPLIT,
  TRIPLE_SPLIT,
  EMPTY
}

export interface Item {
  type: ValueType;
  value: number;
  valueSplit: number[];
}

export interface PlacedChip {
  item: Item;
  sum: number;
}

export type RouletteData = {
  numbers: number[];
};

export type ChipsData = {
  selectedChip: number;
  placedChips: Map<string, PlacedChip>;
};

export type WheelNumber = {
  next: string | null;
};

export enum GameStages {
  PLACE_BET,
  NO_MORE_BETS,
  WINNERS,
  NONE
}

export type Winner = {
  username: string;
  sum: number;
};

export type GameData = {
  stage: GameStages;
  time_remaining: number;
  value: number;
  wins: Winner[];
  history: number[];
};

export type RouletteState = {
  rouletteData: RouletteData;
  number: WheelNumber;
  chipsData: ChipsData;
  winners: Winner[];
  username: string;
  endTime: number;
  progressCountdown: number;
  time_remaining: number;
  stage: GameStages;
  history: number[];
  balance: number;
  lastWin: number;
};
