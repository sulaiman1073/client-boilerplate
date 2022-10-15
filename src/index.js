/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
// import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "./redux/store";
import history from "./history";
import App from "./App";
// import * as Sentry from "@sentry/react";
import * as Sentry from "@sentry/browser";
import { Integrations as ApmIntegrations } from "@sentry/apm";

const AppFinal = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

// const WithHotReload =
//   process.env.NODE_ENV === "production" ? AppFinal : hot(AppFinal);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://bdb64d6f5f1642029a8da88bb764cbca@o433742.ingest.sentry.io/5389541",
    release: "release123" + process.env.npm_package_version,
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: 1.0 // Be sure to lower this in production
  });
}

ReactDOM.render(<AppFinal />, document.getElementById("root"));
// const WithHotReload =
//   process.env.NODE_ENV === "production" ? AppFinal : hot(AppFinal);

// ReactDOM.render(<WithHotReload />, document.getElementById("root"));
