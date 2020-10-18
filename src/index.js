import React from "react";
import ReactDOM from "react-dom";
import { Bingo } from "./bingo/Bingo";
import { Cart } from "./cart/Cart";

ReactDOM.render(<Bingo />, document.getElementById("bingo"));
ReactDOM.render(<Cart />, document.getElementById("cart"));
