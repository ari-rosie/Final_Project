const initialState = {
  status: "idle",
  garden: [],
  summary: [],
  target: [],
};

export default function gardenReducer(state = initialState, action) {
  let newGarden = [...state.garden];
  let newSummary = [...state.summary];

  switch (action.type) {
    case "CREATE-MY-GARDEN":
      return {
        ...state,
        garden: [...state.garden, action.tileObj],
      };
    case "SET-GARDEN-STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "COPY-GARDEN-FROM-DB":
      return {
        ...state,
        garden: action.garden,
        status: "ready",
      };
    case "UPDATE-GARDEN-TILE":
      let overlapping = false;

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
            if (!newSummary.find((ele) => ele.id === action.plantObj.id)) {
              newSummary.push({
                id: action.plantObj.id,
                quantity: 1,
              });
            } else {
              newSummary = newSummary.map((ele) =>
                ele.id === action.plantObj.id
                  ? { ...ele, quantity: ele.quantity + 1 }
                  : ele
              );
            }
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
    case "DELETE-GARDEN-TILES":
      action.tilesArray.forEach((tile) => {
        if (tile === action.index) {
          newSummary.forEach((plant) => {
            if (state.garden[tile].plant.id === plant.id) {
              if (plant.quantity > 1) {
                newSummary[newSummary.indexOf(plant)] = {
                  ...plant,
                  quantity: plant.quantity - 1,
                };
              } else {
                newSummary.splice(newSummary.indexOf(plant), 1);
              }
            }
          });
        }
        newGarden[tile] = {
          _id: state.garden[tile]._id,
          spacing: false,
          planted: false,
        };
      });
      return {
        ...state,
        garden: newGarden,
        summary: newSummary,
      };
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
