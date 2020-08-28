const initialState = {
  status: "idle",
  garden: [],
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
      console.log(action.tilesArray);
      let overlapping = false;
      let newGarden = [...state.garden];

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
        };
      } else return { ...state };
    default: {
      return state;
    }
  }
}
