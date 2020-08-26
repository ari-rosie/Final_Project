const initialState = {
  userData: JSON.parse(window.localStorage.getItem("user")) || null,
  loggedIn: window.localStorage.getItem("user") ? true : false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET-CURRENT-USER":
      window.localStorage.setItem("user", JSON.stringify(action.userData));
      return {
        ...state,
        userData: action.userData,
        loggedIn: true,
      };
    case "LOG-OUT-CURRENT-USER":
      localStorage.removeItem("user");
      return {
        ...state,
        userData: null,
        loggedIn: false,
      };
    default: {
      return state;
    }
  }
}
