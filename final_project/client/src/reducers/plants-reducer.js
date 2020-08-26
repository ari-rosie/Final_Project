const initialState = {
  status: "idle",
  plants: {},
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
    default: {
      return state;
    }
  }
}
