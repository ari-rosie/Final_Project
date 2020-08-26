import { combineReducers } from "redux";

import userReducer from "./user-reducer";
import plantsReducer from "./plants-reducer";
import gardenReducer from "./garden-reducer";

export default combineReducers({ userReducer, plantsReducer, gardenReducer });
