import { combineReducers } from "redux";
import TodosReducer from "./todosReducer";

const rootReducers = combineReducers({
    todoData: TodosReducer
});

export default rootReducers;