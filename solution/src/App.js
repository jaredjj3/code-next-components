import React from "react";
import { Bingo } from "./bingo/Bingo";
import { Cart } from "./cart/Cart";
import { Todo } from "./todo/Todo";

export const App = () => {
  return (
    <>
      <h2>Todo</h2>
      <Todo />

      <hr />

      <h2>Cart</h2>
      <Cart />

      <hr />

      <h2>Bingo</h2>
      <Bingo />
    </>
  );
};
