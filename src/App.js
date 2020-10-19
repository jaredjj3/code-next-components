import React from "react";
import { Bingo } from "./bingo/Bingo";
import { Cart } from "./cart/Cart";

export const App = () => {
  return (
    <>
      <h2>Cart</h2>
      <Cart />

      <hr />

      <h2>Bingo</h2>
      <Bingo />
    </>
  );
};
