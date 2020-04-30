import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react-lite"
import { Redirect } from "react-router-dom"

import Input from "@material-ui/core/Input"
import Container from "@material-ui/core/Container"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import AppButton from "./AppButton"

import AppCopy from "./AppCopy"
import { rootStoreContext } from "../stores/RootStore"

const LoginForm = observer(({ location }) => {
  const rootStore = useContext(rootStoreContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { from } = location.state || { from: { pathname: "/" } }

  const changeUsername = e => setUsername(e.target.value)

  const changePassword = e => setPassword(e.target.value)

  const login = event => {
    event.preventDefault()
    rootStore.authStore.login(username, password)
  }

  if (rootStore.authStore.isAuthenticated) return <Redirect to={from} />

  return (
    <Container className="login-form">
      <form className="login-form__form" onSubmit={login}>
        <FormGroup className="login-form__input">
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              type="username"
              value={username}
              onChange={changeUsername}
              error={rootStore.authStore.error}
              required
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="login-form__input">
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              value={password}
              type="password"
              onChange={changePassword}
              error={rootStore.authStore.error}
              required
            />
          </FormControl>
        </FormGroup>
        <AppButton submit>Sign In</AppButton>
        {rootStore.authStore.error && (
          <AppCopy className="login-form__error">
            Incorrect Username or password
          </AppCopy>
        )}
      </form>
    </Container>
  )
})

LoginForm.propTypes = {
  location: PropTypes.object,
}

export default LoginForm
