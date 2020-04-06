import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import Register from './Register';
import * as serviceWorker from "./serviceWorker";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import LetComponent from "./LetComponent";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path='/register' component={Register} />
    </Router>
    <LetComponent> </LetComponent>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
