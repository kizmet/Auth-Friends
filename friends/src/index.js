import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import rootReducer from './reducers';

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
    
        <App />
    
    </Provider>,
    rootElement
);
