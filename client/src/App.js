import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./components/homepage";
import SignUpPage from "./components/sign-up-page";
import Account from "./components/account";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/new-account">
            <SignUpPage />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
