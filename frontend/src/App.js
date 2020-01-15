import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import RoutesIndex from "./routes"
import { observer } from "mobx-react-lite"
import IndexProvider from "./contexts"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#086375", contrastText: "#ffffff" },
    secondary: { main: "#119da4", contrastText: "#ffffff" },
    background: {
      default: "#F2FCFF",
    },
  },
})

const App = observer(() => {
  return (
    <MuiThemeProvider theme={theme}>
      <IndexProvider>
        <RoutesIndex />
      </IndexProvider>
    </MuiThemeProvider>
  )
})

export default App
