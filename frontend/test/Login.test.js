import React from "react"
import { shallow } from "enzyme"
import LoginForm from "../src/components/LoginForm"
import Button from "@material-ui/core/Button"

describe("<LoginForm />", () => {
  // create initial props that get passed in
  const initialProps = {
    location: {
      state: {
        from: {
          pathname: "/",
        },
      },
    },
  }

  // Render the login form component, pass in props. (Shallow method renders the component without its children.)
  const wrapper = shallow(<LoginForm {...initialProps} />)

  // UI Integrity test
  it("should match the snapshot", () => {
    // snapshots are text references of the html of the rendered component.
    expect(wrapper.html()).toMatchSnapshot()
  })

  // Grab the UI pieces you want to test
  const usernameInput = wrapper.find("#username")
  const passwordInput = wrapper.find("#password")
  const signInButton = wrapper.find(Button)

  it("should have a username inputs", () => {
    expect(usernameInput.length).toEqual(1)
  })

  it("should have the expected props on the username field", () => {
    expect(usernameInput.props()).toEqual({
      id: "username",
      name: "username",
      value: "",
      onChange: expect.any(Function),
      required: true,
    })
  })

  it("should have a password field", () => {
    expect(passwordInput.length).toEqual(1)
  })

  it("should have the expected props on the password field", () => {
    expect(passwordInput.props()).toEqual({
      id: "password",
      name: "password",
      value: "",
      type: "password",
      onChange: expect.any(Function),
      required: true,
    })
  })

  it("should have a submit button", () => {
    expect(signInButton.length).toEqual(1)
  })

  it("should have the expected props on the button", () => {
    expect(signInButton.props()).toEqual({
      type: "button",
      variant: "contained",
      style: expect.objectContaining({
        marginTop: "10px",
      }),
      onClick: expect.any(Function),
      children: "Sign In",
    })
  })
})
