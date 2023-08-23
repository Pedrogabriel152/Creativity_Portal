import { combineReducers } from "redux";
import userSlice from "./User/userSlice";

export default combineReducers({
    user: userSlice
});