import {
  TILE_SIZE_REPRESENTATION,
  GARDEN_HEIGHT,
  GARDEN_WIDTH,
} from "./constants";

export const getNumberFromString = (string) => {
  let number = string.match(/(\d+)/);
  if (number) return number[0];
  else return 10;
};

export const getTilesSpace = (spacing) => {
  return Math.round(spacing / TILE_SIZE_REPRESENTATION);
};

export const getSpacingTilesArray = (string, plantCenterIndex) => {
  const array = [];
  const spacingTiles = getTilesSpace(getNumberFromString(string));

  let index =
    plantCenterIndex -
    (GARDEN_WIDTH / TILE_SIZE_REPRESENTATION) * spacingTiles -
    spacingTiles;
  for (let i = 0; i < spacingTiles * 2 + 1; i++) {
    if (
      index <
      (GARDEN_HEIGHT / TILE_SIZE_REPRESENTATION) *
        (GARDEN_WIDTH / TILE_SIZE_REPRESENTATION)
    ) {
      if (index >= 0) {
        for (let j = 0; j < spacingTiles * 2 + 1; j++) {
          array.push(index++);
        }
        index -= spacingTiles * 2 + 1;
      }
      index += GARDEN_WIDTH / TILE_SIZE_REPRESENTATION;
    }
  }
  return array;
};

export const getPlantObjById = (id, array) => {
  return array.find((plant) => plant.id === id);
};
