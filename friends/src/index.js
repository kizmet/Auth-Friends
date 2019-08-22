import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { LOGIN_SUCCESS } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const customMiddleware = store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    // just adding this in case mvp requirements needed it
    // localStorage.setItem('token', action.payload)
  }
  next(action);
};

// I'd add the middleware to applyMiddleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
