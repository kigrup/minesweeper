import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
document.addEventListener("contextmenu", (event) => event.preventDefault());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
