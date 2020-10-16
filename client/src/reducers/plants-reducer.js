const initialState = {
  status: "idle",
  plants: {},
  plantTarget: {},
};

export default function plantsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST-ALL-PLANTS":
      return {
        ...state,
        status: "loading",
      };
    case "RECEIVE-ALL-PLANTS":
      return {
        ...state,
        status: "ready",
        plants: action.plants,
      };
    case "SET-PLANT-ON-DRAG":
      console.log(action.plantObj);
      return {
        ...state,
        plantTarget: action.plantObj,
      };
    default: {
      return state;
    }
  }
}
