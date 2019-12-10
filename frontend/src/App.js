import React, { useEffect, useContext } from "react"
import { rootStoreContext } from "./stores/RootStore"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import RoutesIndex from "./routes"
import api from "./api"
import { observer } from "mobx-react-lite"

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
  const rootStore = useContext(rootStoreContext)

  useEffect(() => {
    async function stillAuthenticated() {
      const verifyToken = await api.verifyToken()
      if (verifyToken.ok) {
        rootStore.authStore.setIsAuthenticated(true)
      } else {
        rootStore.authStore.setIsAuthenticated(false)
      }
    }
    stillAuthenticated()
    //Add in dependency to eliminate eslint error
  }, []) // Hooks equivalent to "componentDidMount"

  if (rootStore.authStore.isAuthenticated === null) {
    return null
  }

  return (
    <MuiThemeProvider theme={theme}>
      <RoutesIndex />
    </MuiThemeProvider>
  )
})

export default App
