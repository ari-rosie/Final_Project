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

export const deleteGardenTiles = (index, tilesArray) => ({
  type: "DELETE-GARDEN-TILES",
  index: index,
  tilesArray: tilesArray,
});

export const togglePlantsMenuContent = () => ({
  type: "TOGGLE-PLANTS-MENU-CONTENT",
});

export const toggleSummaryMenuContent = () => ({
  type: "TOGGLE-SUMMARY-MENU-CONTENT",
});

export const toggleModalShowing = (content, contentType) => ({
  type: "TOGGLE-MODAL-SHOWING",
  content: content,
  contentType: contentType,
});

export const targetGardenTiles = (target) => ({
  type: "TARGET-GARDEN-TILES",
  target: target,
});

export const setPlantOnDrag = (plantObj) => ({
  type: "SET-PLANT-ON-DRAG",
  plantObj: plantObj,
});

export const addExtraContent = (contentDiv) => ({
  type: "ADD-EXTRA-CONTENT",
  contentDiv: contentDiv,
});

export const setGardenStatus = (status) => ({
  type: "SET-GARDEN-STATUS",
  status: status,
});

export const copyGardenFromDb = (garden) => ({
  type: "COPY-GARDEN-FROM-DB",
  garden: garden,
});
