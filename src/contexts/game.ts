import { atom } from "jotai";
import { Player, PlayerNameAndSymbol, gameTableInitialValue } from "./types/game";

export const currentPlayerAtom = atom<Player>(Player.X);
export const remainingMovesAtom = atom<number>(9);
export const gameTableAtom = atom<Array<Array<string>>>(gameTableInitialValue);
