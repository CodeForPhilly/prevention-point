import React, { useState } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"

import "../scss/login-form.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import api from "../api"
import { useContextAuth, LOGIN } from "../contexts/auth"

const LoginForm = observer(({ location }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { pathname } = location.state.from || { pathname: "/" }

  const changeUsername = e => setUsername(e.target.value)

  const changePassword = e => setPassword(e.target.value)

  const {
    auth: { username: authUsername },
    dispatchAuth,
  } = useContextAuth()
  const login = async () => {
    try {
      const { ok } = await api.createToken(username, password)
      if (ok) dispatchAuth(LOGIN(username))
    } catch (error) {
      // TODO: Handle errors
    }
  }
  if (authUsername) return <Redirect to={pathname} />

  return (
    <div className="login-form">
      <form className="login-form__form">
        <FormGroup className="login-form__input">
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              type="username"
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
