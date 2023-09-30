// App.js
import React from "react";
import TodoList from "./Components/TodoList";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TodoList />
    </div>
  );
};

export default App;
