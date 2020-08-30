const initialState = {
  isShowing: false,
  content: {},
  contentType: null,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE-MODAL-SHOWING":
      return {
        ...state,
        isShowing: !state.isShowing,
        content: action.content,
        contentType: action.contentType,
      };
    default: {
      return state;
    }
  }
}
