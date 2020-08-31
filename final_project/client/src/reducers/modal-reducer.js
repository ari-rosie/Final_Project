const initialState = {
  isShowing: false,
  content: {},
  contentType: null,
  extraContent: null,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE-MODAL-SHOWING":
      return {
        ...state,
        isShowing: !state.isShowing,
        content: action.content,
        contentType: action.contentType,
        extraContent: null,
      };
    case "ADD-EXTRA-CONTENT":
      return {
        ...state,
        extraContent: action.contentDiv,
      };
    default: {
      return state;
    }
  }
}
