import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth';
//auth == authReducer
export default combineReducers({ posts, auth });