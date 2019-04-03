import React, { useState } from "react"
import "../scss/login-form.scss"
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
          style={{ "margin-top": "10px" }}
        >
          Log In
        </Button>
      </form>
    </div>
  )
}
