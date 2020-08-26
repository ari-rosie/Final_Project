const initialState = {
  garden: [],
  diggingSpot: null,
};

export default function gardenReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE-MY-GARDEN":
      return {
        ...state,
        garden: [...state.garden, action.tile],
      };
    case "SET-DIGGING-SPOT":
      return {
        ...state,
        diggingSpot: {
          x: action.x,
          y: action.y,
        },
      };
    default: {
      return state;
    }
  }
}
