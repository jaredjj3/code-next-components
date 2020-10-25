import React, { useState } from 'react';
import { TodoInput } from './TodoInput';
import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';

export const Todo = () => {
  const [todos, setTodos] = useState([]);

  const onTodoInputSubmit = (todo) => {
    const nextTodos = [...todos];
    nextTodos.push(todo);
    setTodos(nextTodos);
  };

  const onTodoClick = (ndx) => {
    const nextTodos = [...todos];
    nextTodos.splice(ndx, 1);
    setTodos(nextTodos);
  };

  return (
    <div>
      <TodoInput onSubmit={onTodoInputSubmit} />
      <TodoCount todos={todos} />
      <TodoList todos={todos} onTodoClick={onTodoClick} />
    </div>
  );
};
