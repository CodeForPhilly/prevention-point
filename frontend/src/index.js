import React from "react"
import ReactDOM from "react-dom"
import Root from "./components/Root"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1d5e6e",
    },
    secondary: {
      main: "#17acb2",
    },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  )
}

let app = document.getElementById("app")
ReactDOM.render(<App />, app)
