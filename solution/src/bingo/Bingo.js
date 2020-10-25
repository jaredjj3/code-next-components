import React, { useState } from "react";
import { Counter } from "./Counter";

const WIN_THRESHOLD = 3;

const INITIAL_GRID = [
  [
    { description: "physical photo", count: 0 },
    { description: "round", count: 0 },
    { description: "red", count: 0 }
  ],
  [
    { description: "noisemaker", count: 0 },
    { description: "childhood item", count: 1 },
    { description: "souvenir", count: 0 }
  ],
  [
    { description: "collectible", count: 0 },
    { description: "broken", count: 0 },
    { description: "snack wrapper", count: 0 }
  ]
];

const getNumWins = grid => {
  const rows = grid;
  const cols = grid.map((_, ndx) => rows.map(row => row[ndx]));
  const diags = [
    [grid[0][0], grid[1][1], grid[2][2]],
    [grid[2][0], grid[1][1], grid[0][2]]
  ];
  const isWon = arr => arr.every(el => el.count >= WIN_THRESHOLD);
  return [...rows, ...cols, ...diags].reduce((count, arr) => {
    return isWon(arr) ? count + 1 : count;
  }, 0);
};

const copyGrid = (grid) => grid.map(row => row.map(el => ({ ...el })));

export const Bingo = () => {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const numWins = getNumWins(grid);

  const increment = (r, c) => () => {
    const nextGrid = copyGrid(grid);
    nextGrid[r][c].count++;
    setGrid(nextGrid);
  };

  const decrement = (r, c) => () => {
    const nextGrid = copyGrid(grid);
    nextGrid[r][c].count--;
    setGrid(nextGrid);
  };

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
