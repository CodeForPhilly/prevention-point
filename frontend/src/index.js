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
  typography: {
    useNextVariants: true,
    fontFamily: ["Arial", "sans-serif"].join(","),

    // https://material-ui.com/api/typography/
    // Main/H1/White

    h1: {
      fontStyle: ["normal"],
      fontSize: ["32px"],
      lineheight: ["38px"],
      fontWeight: ["bold"],
      color: ["#FFFFFF"],
    },

    // Main/H1/Green
    h2: {
      fontSize: ["32px"],
      fontWeight: ["bold"],
      color: ["#336D7C"],
    },

    // header/link
    h3: {
      fontSize: ["13px"],
      fontWeight: ["bold"],
      color: ["#FFFFFF"],
    },

    // header/notification
    h4: {
      fontSize: ["12px"],
      color: ["#000000"],
    },

    // sidebar
    h5: {
      fontSize: ["28px"],
      fontWeight: ["bold"],
      color: ["#336D7C"],
    },

    // sidebar 2
    h6: {
      fontSize: ["16px"],
      fontWeight: ["bold"],
      color: ["#292929"],
    },

    // form/instuctions
    subtitle1: {
      fontSize: ["20px"],
      color: ["#2699FB"],
    },

    // form/H3
    subtitle2: {
      fontSize: ["16px"],
      color: ["#336E7C"],
    },

    // form/H1
    subtitle3: {
      fontSize: ["16px"],
      color: ["#336E7C"],
    },

    // form/Response/Grey
    body1: {
      fontSize: ["14px"],
      //lineheight: [],
      color: ["#BCBCBC"],
    },
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
