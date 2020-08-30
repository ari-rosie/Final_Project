import { combineReducers } from "redux";

import userReducer from "./user-reducer";
import plantsReducer from "./plants-reducer";
import gardenReducer from "./garden-reducer";
import menuReducer from "./menu-reducer";
import modalReducer from "./modal-reducer";

export default combineReducers({
  userReducer,
  plantsReducer,
  gardenReducer,
  menuReducer,
  modalReducer,
});
