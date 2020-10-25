import React from 'react';

export const TodoInput = (props) => {
  const [todo, setTodo] = useState('');

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  const onClick = () => {
    props.onSubmit(todo);
    setTodo('');
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={todo}
        onChange={onChange}
      />
      <button className="btn btn-primary" onClick={onClick}>
        submit
      </button>
    </div>
  );
};