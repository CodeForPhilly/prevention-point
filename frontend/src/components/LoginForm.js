import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"

import "../scss/login-form.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"

const LoginForm = observer(({ location }) => {
  const rootStore = useContext(rootStoreContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { from } = location.state || { from: { pathname: "/" } }

  const changeUsername = e => setUsername(e.target.value)

  const changePassword = e => setPassword(e.target.value)

  const login = () => {
    rootStore.authStore.login(username, password)
  }

  if (rootStore.authStore.isAuthenticated) return <Redirect to={from} />

  return (
    <div className="login-form">
      <form className="login-form__form">
        <FormGroup className="login-form__input">
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              value={username}
              onChange={changeUsername}
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
              required
            />
          </FormControl>
        </FormGroup>
        <Button
          type="button"
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={login}
        >
          Sign In
        </Button>
      </form>
    </div>
  )
})

LoginForm.propTypes = {
  location: PropTypes.object,
}

export default LoginForm
