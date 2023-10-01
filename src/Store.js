import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./Features/Todos/TodosSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
