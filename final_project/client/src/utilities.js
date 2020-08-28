import { TILE_SIZE_REPRESENTATION } from "./constants";

export const getNumberFromString = (string) => {
  let number = string.match(/(\d+)/);
  if (number) return number[0];
  else return 10;
};

export const getTilesSpace = (spacing) => {
  return Math.round(spacing / TILE_SIZE_REPRESENTATION);
};

export const getSpacingTilesArray = (spacingTiles, plantCenterIndex) => {
  const array = [];

  let index = plantCenterIndex - 100 * spacingTiles - spacingTiles;
  for (let i = 0; i < spacingTiles * 2 + 1; i++) {
    if (index >= 0) {
      for (let j = 0; j < spacingTiles * 2 + 1; j++) {
        array.push(index++);
      }
      index -= spacingTiles * 2 + 1;
    }
    index += 100;
  }
  return array;
};
