import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const historyFn = defaultHistory || createMemoryHistory;
  const history = historyFn({
    initialEntries: [initialPath],
  });
  history.listen(onNavigate);
  ReactDOM.render(<App history={history} />, el);
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const el = document.getElementById("_marketing-dev-root");
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory });
  }
}

export { mount };
