import { TILE_SIZE_REPRESENTATION } from "../constants";

const initialState = {
  userData: JSON.parse(window.localStorage.getItem("user")) || null,
  loggedIn: window.localStorage.getItem("user") ? true : false,
  GARDEN_WIDTH: null,
  GARDEN_HEIGHT: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET-CURRENT-USER":
      window.localStorage.setItem("user", JSON.stringify(action.userData));
      let width = Math.round((action.userData.gardenWidth * 100) / 2.54);
      let height = Math.round((action.userData.gardenHeight * 100) / 2.54);
      if (width % TILE_SIZE_REPRESENTATION !== 0) width++;
      if (height % TILE_SIZE_REPRESENTATION !== 0) height++;
      return {
        ...state,
        userData: action.userData,
        loggedIn: true,
        GARDEN_WIDTH: width,
        GARDEN_HEIGHT: height,
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
