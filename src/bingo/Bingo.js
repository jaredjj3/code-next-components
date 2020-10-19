import React, { useState } from "react";
import { Counter } from "./Counter";

export const Bingo = () => {
  const [grid, setGrid] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

  const copyGrid = () => grid.map(row => row.map(el => el));

  const increment = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c]++;
    setGrid(nextGrid);
  };

  const decrement = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c]--;
    setGrid(nextGrid);
  };

  return (
    <div className="container">
      {grid.map((rows, r) => (
        <div key={r} className="row">
          {rows.map((count, c) => (
            <Counter
              key={`count-${r}-${c}`}
              count={count}
              increment={increment(r, c)}
              decrement={decrement(r, c)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
