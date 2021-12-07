//npm i redux-devtools-extension
//npm i react-redux redux

import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducerLog from "./login";
import reducerTasks from "./tasks"

const reducers = combineReducers({ reducerLog , reducerTasks});
const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
