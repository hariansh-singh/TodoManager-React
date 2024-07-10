// TodoItem.jsx

import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodoContext();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className={`flex items-center bg-gray-800 bg-opacity-75 border border-gray-700 rounded-lg p-3 mb-2 ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-100'}`}>
      <input
        type="checkbox"
        className="form-checkbox rounded"
        checked={todo.isCompleted}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`flex-grow ml-2 outline-none bg-transparent ${isTodoEditable ? 'border-b border-gray-400' : 'border-none'}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className={`ml-2 text-gray-400 hover:text-white transition-opacity ${todo.isCompleted ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        onClick={() => {
          if (!todo.isCompleted) {
            setIsTodoEditable((prev) => !prev);
          }
        }}
      >
        {isTodoEditable ? 'Save' : 'Edit'}
      </button>
      <button
        className="ml-2 text-red-400 hover:text-white transition-opacity"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
