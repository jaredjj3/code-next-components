import React from "react";

export const Counter = props => {
  return (
    <div className="col card text-center">
      <div className="card-body">
        <h5 className="card-title">{props.count}</h5>
        <p className="card-text">{props.count}</p>
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={props.increment}
          >
            +1
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={props.decrement}
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
};
