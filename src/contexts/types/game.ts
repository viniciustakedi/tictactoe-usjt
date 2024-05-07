export type PlayerNameAndSymbol = {
  name: string,
  symbol: Player
}

export enum Player {
  X = "X",
  O = "O"
}

export const gameTableInitialValue = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]
