import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react-lite"
import { Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import PreventionPointLogo from "../../public/img/logo.svg"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import PrevPointInput from "../components/Input/PrevPointInput"
import PrevPointButton from "../components/PrevPointButton"
import PrevPointCopy from "../components/Typography/PrevPointCopy"
import { rootStoreContext } from "../stores/RootStore"

const LoginForm = observer(({ location }) => {
  const rootStore = useContext(rootStoreContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { from } = location.state || { from: { pathname: "/" } }

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(6, 0, 0, 0),
      "& .login-form__form": {
        margin: "0 auto",
        maxWidth: "400px",
      },
      "& .login-form__error": {
        color: "#ff000f",
        paddingTop: theme.spacing(2),
      },
    },
    appBar: {
      "& .navbar__logo": {
        marginRight: "auto",
      },
    },
    navbarToolbar: {
      justifyContent: "flex-end",
      paddingTop: "8px",
      paddingBottom: "8px",
      "@media (max-width: 700px)": {
        flexWrap: "wrap",
      },
    },
    navbarOffset: {
      ...theme.mixins.toolbar,
      "@media (max-width: 700px)": {
        minHeight: "116px",
      },
    },
  }))
  const classes = useStyles()

  const login = event => {
    event.preventDefault()
    rootStore.authStore.login(username, password)
  }

  if (rootStore.authStore.isAuthenticated) return <Redirect to={from} />

  return (
    <>
      <AppBar
        title="Prevention Point"
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar className={classes.navbarToolbar}>
          <img
            src={PreventionPointLogo}
            alt="Prevention Point Logo"
            className="navbar__logo"
            width="150"
          />
        </Toolbar>
      </AppBar>

      <div className={classes.navbarOffset} />
      <Container className={classes.root}>
        <Grid
          container
          component="form"
          className="login-form__form"
          onSubmit={login}
        >
          <Grid item xs={12}>
            <FormControl error={rootStore.authStore.error}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <PrevPointInput
                id="username"
                name="username"
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl error={rootStore.authStore.error}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <PrevPointInput
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <PrevPointButton type="submit">Sign In</PrevPointButton>
            {rootStore.authStore.error && (
              <PrevPointCopy className="login-form__error">
                Incorrect Username or password
              </PrevPointCopy>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
})

LoginForm.propTypes = {
  location: PropTypes.object,
}

export default LoginForm
