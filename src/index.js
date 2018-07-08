import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider as RebassProvider } from "rebass";
import configureStore from "./configureStore";
import App from "./App";
import Layout from "./Layout";
import Posts from "./Posts";
import Post from "./Post";

const store = configureStore();

ReactDOM.render(
  <RebassProvider
    theme={{
      fonts: {
        sans: '"Avenir Next", Helvetica, sans-serif'
      },
      fontSizes: [ 12, 16, 24, 36, 48, 72 ]
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  </RebassProvider>,
  document.getElementById("root")
);
