import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import viewer_reducer from "./viewer_reducer";

const rootReducer = combineReducers({
  user_reducer,
  viewer_reducer,
});

export default rootReducer;
