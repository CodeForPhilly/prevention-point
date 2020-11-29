import React, { useEffect, useContext } from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { observer } from "mobx-react-lite"

import api from "./api"
import theme from "./style/theme"
import RoutesIndex from "./routes"
import { rootStoreContext } from "./stores/RootStore"

import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

const App = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore

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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={participantStore.snackbarState.open}
        autoHideDuration={6000}
        onClose={() => participantStore.setSnackbarState("", { open: false })}
      >
        <Alert
          variant="filled"
          severity={participantStore.snackbarState.severity}
          onClose={() => participantStore.setSnackbarState("", { open: false })}
        >
          {participantStore.snackbarState.message}
        </Alert>
      </Snackbar>
    </MuiThemeProvider>
  )
})

export default App
