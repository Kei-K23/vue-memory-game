export type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type GameState = {
  moves: number;
  matched: number;
  startTime: number;
  bestRecord: number;
};
