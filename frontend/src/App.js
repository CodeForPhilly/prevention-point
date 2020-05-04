import React, { useEffect, useContext } from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { observer } from "mobx-react-lite"

import "./style/main.scss"
import api from "./api"
import theme from "./style/theme"
import RoutesIndex from "./routes"
import { rootStoreContext } from "./stores/RootStore"

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
    //Suppress eslint error for []
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
