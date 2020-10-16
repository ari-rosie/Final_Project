const initialState = {
  plants: false,
  summary: false,
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE-PLANTS-MENU-CONTENT":
      return {
        ...state,
        plants: !state.plants,
        summary: false,
      };
    case "TOGGLE-SUMMARY-MENU-CONTENT":
      return {
        ...state,
        plants: false,
        summary: !state.summary,
      };
    default: {
      return state;
    }
  }
}
