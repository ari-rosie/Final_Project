const initialState = {
  status: "idle",
  garden: [],
  summary: [],
  target: [],
};

export default function gardenReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE-MY-GARDEN":
      return {
        ...state,
        status: "ready",
        garden: [...state.garden, action.tileObj],
      };
    case "UPDATE-GARDEN-TILE":
      let overlapping = false;
      let newGarden = [...state.garden];
      let newSummary = [...state.summary];

      action.tilesArray.forEach((tile) => {
        if (newGarden[tile].planted) {
          overlapping = true;
          return;
        }
        if (!overlapping) {
          if (tile !== action.index) {
            newGarden[tile] = {
              ...newGarden[tile],
              spacing: true,
              plant: action.plantObj,
            };
          } else {
            newSummary.push(action.plantObj.id);
            newGarden[action.index] = {
              ...newGarden[action.index],
              planted: true,
              plant: action.plantObj,
            };
          }
        }
      });
      if (!overlapping) {
        return {
          ...state,
          garden: newGarden,
          summary: newSummary,
        };
      } else return { ...state };
    case "TARGET-GARDEN-TILES":
      return {
        ...state,
        target: action.target,
      };
    default: {
      return state;
    }
  }
}
