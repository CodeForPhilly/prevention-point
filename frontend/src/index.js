import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "mobx-react-lite/batchingForReactDom"
import { RootStoreContext, RootStore } from "./stores/RootStore"

// old setup
// ReactDOM.render(<App />, document.getElementById("app"))

// per Mui Setup https://material-ui.com/getting-started/usage/

ReactDOM.render(
  <RootStoreContext.Provider value={new RootStore()}>
    <App />
  </RootStoreContext.Provider>,
  document.querySelector("#app")
)
