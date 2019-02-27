import React, { Component } from "react"
import AppContainer from "./src/Navigation/Navigation"

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
