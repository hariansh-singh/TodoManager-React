import React, { useState, useEffect } from 'react';
import { TodoProvider } from './contexts/TodoContext';
import { ThemeProvider } from './contexts/ThemeMode';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import ThemeBtn from './components/ThemeBtn';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState('dark');

  const darkTheme = () => {
    setThemeMode('dark');
  };

  const lightTheme = () => {
    setThemeMode('light');
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));

    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
        <div className={`min-h-screen py-8 ${themeMode === 'light' ? 'bg-gray-200 text-gray-1000' : 'bg-gray-900 text-gray-100'}`}>
          <div className="w-full max-w-2xl mx-auto bg-gray-800 bg-opacity-75 shadow-md rounded-lg px-6 py-8">

            {/* Place ThemeBtn component here */}
            <div className="flex justify-end mb-4">
              <ThemeBtn />
            </div>

            <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">Manage Your Todos</h1>
            <TodoForm />
            <div className="mt-6">
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;
