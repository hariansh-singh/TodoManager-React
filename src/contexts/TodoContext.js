import React, { createContext, useContext} from 'react'

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo message 1",
            isCompleted: false
        }
    ],

    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},

})

export function useTodoContext() {
  return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider
