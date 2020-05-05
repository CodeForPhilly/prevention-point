import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"
import { Redirect } from "react-router-dom"
import Container from "@material-ui/core/Container"
import FormGroup from "@material-ui/core/FormGroup"
import InputLabel from "@material-ui/core/InputLabel"
import PrevPointInput from "./PrevPointInput"
import FormControl from "@material-ui/core/FormControl"
import PrevPointButton from "./PrevPointButton"
import PrevPointCopy from "./Typography/PrevPointCopy"

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
            <PrevPointInput
              id="username"
              name="username"
              type="username"
              value={username}
              onChange={changeUsername}
              error={rootStore.authStore.error}
              required={true}
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="login-form__input">
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <PrevPointInput
              id="password"
              name="password"
              value={password}
              type="password"
              onChange={changePassword}
              error={rootStore.authStore.error}
              required={true}
            />
          </FormControl>
        </FormGroup>
        <PrevPointButton type="submit">Sign In</PrevPointButton>
        {rootStore.authStore.error && (
          <PrevPointCopy className="login-form__error">
            Incorrect Username or password
          </PrevPointCopy>
        )}
      </form>
    </Container>
  )
})

LoginForm.propTypes = {
  location: PropTypes.object,
}

export default LoginForm
