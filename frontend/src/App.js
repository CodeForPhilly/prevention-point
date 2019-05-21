import React, { useEffect, useContext } from "react"
import { rootStoreContext } from "./stores/rootStore"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import RoutesIndex from "./routes"
import authApi from "./api/authApi"
import { observer } from "mobx-react-lite"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#086375", contrastText: "#ffffff" },
    secondary: { main: "#119da4", contrastText: "#ffffff" },
  },
  typography: {
    useNextVariants: true,
  },
})

const App = observer(() => {
  const rootStore = useContext(rootStoreContext)

  useEffect(() => {
    async function stillAuthenticated() {
      const verifyToken = await authApi.verifyToken()
      if (verifyToken.ok) {
        rootStore.authStore.setIsAuthenticated(true)
      } else {
        rootStore.authStore.setIsAuthenticated(false)
      }
    }
    stillAuthenticated()
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
