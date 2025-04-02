import React from "react";
import Login from "./components/Login";
import Success from "./components/Success";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
