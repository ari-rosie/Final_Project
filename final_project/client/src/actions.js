export const setCurrentUser = (data) => ({
  type: "SET-CURRENT-USER",
  userData: data,
});

export const logOutCurrentUser = () => ({
  type: "LOG-OUT-CURRENT-USER",
});

export const requestAllPlants = () => ({
  type: "REQUEST-ALL-PLANTS",
});

export const receiveAllPlants = (data) => ({
  type: "RECEIVE-ALL-PLANTS",
  plants: data,
});

export const createMyGarden = (tileObj) => ({
  type: "CREATE-MY-GARDEN",
  tileObj: tileObj,
});

export const updateGardenTile = (plantObj, index, tilesArray) => ({
  type: "UPDATE-GARDEN-TILE",
  plantObj: plantObj,
  index: index,
  tilesArray: tilesArray,
});
