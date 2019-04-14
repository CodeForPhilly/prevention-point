import React, { useState } from "react"
import PropTypes from "prop-types"
import "../scss/login-form.scss"
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core"
import { Redirect } from "react-router-dom"
import fakeAuth from "../auth"

const LoginForm = ({ location }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true)
    })
  }

  const { from } = location.state || { from: { pathname: "/" } }

  if (redirectToReferrer) return <Redirect to={from} />

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
              onChange={e => setUsername(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormControl>
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "10px" }}
          onClick={login}
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  location: PropTypes.object,
}

export default LoginForm
