import React from 'react';

export const TodoCount = (props) => {
  return (
    <div className="alert alert-primary">
      Todos remaining: {props.todos.length}
    </div>
  );
};
