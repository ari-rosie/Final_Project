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

export const createMyGarden = (tile) => ({
  type: "CREATE-MY-GARDEN",
  tile: tile,
});

export const setDiggingSpot = (x, y) => ({
  type: "SET-DIGGING-SPOT",
  x: x,
  y: y,
});
