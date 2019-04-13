import React from "react"
import ReactDOM from "react-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./routes"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#086375", contrastText: "#ffffff" },
    secondary: { main: "#119da4", contrastText: "#ffffff" },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  )
}

let app = document.getElementById("app")
ReactDOM.render(<App />, app)
