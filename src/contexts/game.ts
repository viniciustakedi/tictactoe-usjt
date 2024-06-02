import {atom} from 'jotai';
import {GameContextType, Player, PlayerNameAndSymbol} from './types/game';

export const currentPlayerAtom = atom<Player>(Player.X);
export const remainingMovesAtom = atom<number>(9);
export const gameTableAtom = atom<Array<Array<string>>>([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]);

export const winnerAtom = atom<GameContextType | null>(null);