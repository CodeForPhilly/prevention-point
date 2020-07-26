import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "mobx-react-lite/batchingForReactDom"

//old setup
//ReactDOM.render(<App />, document.getElementById("app"))

// per Mui Setup https://material-ui.com/getting-started/usage/

ReactDOM.render(<App />, document.querySelector("#app"))
