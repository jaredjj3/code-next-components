import React, { useState, useEffect } from "react";
import { Counter } from "./Counter";

const WIN_THRESHOLD = 3;

export const Bingo = () => {
  const [grid, setGrid] = useState([
    [
      { description: 'green', count: 0 },
      { description: 'round', count: 0 },
      { description: 'red', count: 0 }
    ],
    [
      { description: 'noisemaker', count: 0 },
      { description: 'childhood item', count: 1 },
      { description: 'souvenir', count: 0 }
    ],
    [
      { description: 'collectible', count: 0 },
      { description: 'broken', count: 0 },
      { description: 'snack wrapper', count: 0 }
    ],
  ]);
  const [numWins, setNumWins] = useState(0);

  const copyGrid = () => grid.map(row => row.map(el => ({ ...el })));

  const increment = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c].count++;
    setGrid(nextGrid);
  };

  const decrement = (r, c) => () => {
    const nextGrid = copyGrid();
    nextGrid[r][c].count--;
    setGrid(nextGrid);
  };

  useEffect(() => {
    const rows = grid;
    const cols = grid.map((_, ndx) => rows.map(row => row[ndx]));
    const diags = [
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[2][0], grid[1][1], grid[0][2]]
    ];

    const isWon = arr => arr.every(el => el >= WIN_THRESHOLD);

    const numWins = [...rows, ...cols, ...diags].reduce((count, arr) => {
      return isWon(arr) ? count + 1 : count;
    }, 0);

    setNumWins(numWins);
  }, [grid]);

  return (
    <div className="container">
      {grid.map((rows, r) => (
        <div key={`row-${r}`} className="row">
          {rows.map((el, c) => (
            <Counter
              key={`counter-${r}-${c}`}
              description={el.description}
              count={el.count}
              threshold={WIN_THRESHOLD}
              increment={increment(r, c)}
              decrement={decrement(r, c)}
            />
          ))}
        </div>
      ))}

      {numWins ? (
        <>
          <br />
          <div className="alert alert-success">We won {numWins} way(s)!</div>
        </>
      ) : null}
    </div>
  );
};
