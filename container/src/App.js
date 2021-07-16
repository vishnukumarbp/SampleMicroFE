import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

const LazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyAuth = lazy(() => import("./components/AuthApp"));
const LazyDashboard = lazy(() => import("./components/DashboardApp"));
import Header from "./components/Header";
import ProgressBar from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setOnSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <div>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setOnSignedIn(false)}
          />
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route path="/auth">
                <LazyAuth setOnSignedIn={setOnSignedIn} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <LazyDashboard />
              </Route>
              <Route path="/" component={LazyMarketing} />
            </Switch>
          </Suspense>
        </StylesProvider>
      </Router>
    </div>
  );
};
