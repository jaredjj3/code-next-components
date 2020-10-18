import React, { useState } from "react";

export const Bingo = () => {
  const [grid, setGrid] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

  const copyGrid = () => grid.map(row => row.map(el => el));

  const increment = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c]++;
    setCountGrid(nextGrid);
  };

  const decrement = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c]--;
    setCountGrid(nextGrid);
  };

  return (
    <div className="container">
      {grid.map((rows, r) => (
        <div key={r} className="row">
          {rows.map((count, c) => (
            <div className="col" key={`count-${r}-${c}`}>
              {count}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
