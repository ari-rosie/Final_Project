const initialState = {
  userData: JSON.parse(window.localStorage.getItem("user")) || null,
  loggedIn: window.localStorage.getItem("user") ? true : false,
  GARDEN_WIDTH: null,
  GARDEN_HEIGHT: null,
  userGarden: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET-CURRENT-USER":
      window.localStorage.setItem("user", JSON.stringify(action.userData));
      let width = Math.round((action.userData.gardenWidth * 100) / 2.54);
      let height = Math.round((action.userData.gardenHeight * 100) / 2.54);
      if (width % 2 !== 0) width++;
      if (height % 2 !== 0) height++;
      return {
        ...state,
        userData: action.userData,
        loggedIn: true,
        GARDEN_WIDTH: width,
        GARDEN_HEIGHT: height,
        userGarden: action.userData.garden || null,
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
