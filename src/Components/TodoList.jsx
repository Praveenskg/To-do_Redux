// components/TodoList.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../features/todos/todosSlice";

const TodoList = ({ todos, addTodo, updateTodo, toggleTodo, deleteTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [editableTodo, setEditableTodo] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleStartEdit = (todo) => {
    setEditableTodo({ ...todo });
  };

  const handleCancelEdit = () => {
    setEditableTodo(null);
  };

  const handleUpdateTodo = () => {
    updateTodo({
      id: editableTodo.id,
      text: editableTodo.text,
    });
    setEditableTodo(null);
  };

  const handleToggleTodo = (id) => {
    toggleTodo({ id });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({ id });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <div className="mt-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="p-2 border-2 border-teal-400 rounded w-full"
            disabled={editableTodo !== null}
          />
          <button
            onClick={handleAddTodo}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none w-full"
            disabled={editableTodo !== null}
          >
            Add Todo
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <ul className="list-disc w-full">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b border-gray-300 py-4 sm:py-2"
            >
              <div
                className={`flex items-center w-full ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="mr-2"
                  disabled={editableTodo !== null}
                />
                {editableTodo && editableTodo.id === todo.id ? (
                  <input
                    type="text"
                    value={editableTodo.text}
                    onChange={(e) =>
                      setEditableTodo({ ...editableTodo, text: e.target.value })
                    }
                    className="border-none outline-none bg-transparent text-blue-500"
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>
              <div className="flex items-center">
                {editableTodo && editableTodo.id === todo.id ? (
                  <>
                    <button
                      onClick={handleUpdateTodo}
                      className="text-green-500 hover:text-green-700 focus:outline-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleStartEdit(todo)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
