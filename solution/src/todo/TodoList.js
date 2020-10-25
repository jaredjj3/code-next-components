import React from 'react';

export const TodoList = (props) => {
  const onClick = (ndx) => () => {
    props.onTodoClick(ndx);
  };

  return (
    <ul className="list-group">
      {props.todos.map((todo, ndx) => (
        <li
          key={`todo-list-item-${ndx}`}
          className="list-group-item"
          onClick={onClick(ndx)}
        >
          {todo}
        </li>
      ))}
    </ul>
  );
};
