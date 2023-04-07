import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { taskReducer } from "./Redux/reducers/TaskReducer";

const reducer = combineReducers({
  tasksState: taskReducer,
});

const middleWares = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
