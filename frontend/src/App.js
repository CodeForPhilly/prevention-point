import React from "react"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import RoutesIndex from "./routes"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#086375", contrastText: "#ffffff" },
    secondary: { main: "#119da4", contrastText: "#ffffff" },
  },
  typography: {
    useNextVariants: true,
  },
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <RoutesIndex />
    </MuiThemeProvider>
  )
}

export default App
