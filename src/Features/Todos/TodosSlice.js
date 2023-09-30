import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text;
      }
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todoToToggle = state.find((todo) => todo.id === id);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
  },
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
