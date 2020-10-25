import React, { useState } from "react";

const DEFAULT_ITEMS = [
  { id: 1, description: 'foo', count: 0 },
  { id: 2, description: 'bar', count: 0 },
  { id: 3, description: 'baz', count: 0 },
  { id: 4, description: 'bam', count: 0 },
];

export const Cart = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  const onResetClick = () => {
    setItems(DEFAULT_ITEMS.map(item => ({ ...item })));
  };

  const onIncrementClick = (id) => () => {
    const nextItems = items.map(item => ({ ...item }));
    const item = nextItems.find(item => item.id === id);
    if (!item) {
      return;
    }
    item.count++;
    setItems(nextItems);
  };

  const onDecrementClick = (id) => () => {
    const nextItems = items.map(item => ({ ...item }));
    const item = nextItems.find(item => item.id === id);
    if (!item) {
      return;
    }
    item.count--;
    setItems(nextItems);
  };

  const onDeleteClick = (id) => () => {
    let nextItems = items.map(item => ({ ...item }));
    nextItems = nextItems.filter(item => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div>
          <div className="badge badge-pill badge-primary">
            {items.filter(item => item.count > 0).length}
          </div>
          &nbsp;
          items
        </div>
      </nav>

      <br />
      <br />

      <button className="btn btn-success" onClick={onResetClick}>
        reset
      </button>

      <br />
      <br />

      {items.map((item) => (
        <ul className="list-group">
          <li key={`item-${item.id}`} className="list-group-item">
            <div className="badge badge-pill badge-primary">
              {item.count}
            </div>

            &nbsp;

            {item.description}

            &nbsp;

            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={onIncrementClick(item.id)}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onDecrementClick(item.id)}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onDeleteClick(item.id)}
              >
                delete
              </button>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};
