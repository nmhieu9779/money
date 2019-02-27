/** @format */

import { AppRegistry } from "react-native"
import React, { Component } from "react"
// import App from "./App"
import { name as appName } from "./app.json"
import AppContainer from "./src/Navigation/Navigation"

// global.Symbol = require("core-js/es6/symbol")
// require("core-js/fn/symbol/iterator")
// require("core-js/fn/map")
// require("core-js/fn/set")
// require("core-js/fn/array/find")

//redux
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import allReducers from "./src/reducers"
import CategoryContainer from "./src/containers/CategoryContainer"

//redux saga
import createSagaMiddleware from "redux-saga"
import rootSaga from "./src/sagas/rootSaga"

const sagaMiddleware = createSagaMiddleware()

let store = createStore(allReducers, applyMiddleware(sagaMiddleware))

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)
sagaMiddleware.run(rootSaga)

AppRegistry.registerComponent(appName, () => App)
