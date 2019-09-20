import React from "react"
import { shallow, configure } from "enzyme"
import LoginForm from "../src/components/LoginForm"
import Button from "@material-ui/core/Button"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

describe("<LoginForm />", () => {
  let wrapper
  // Mock useState call
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, "useState")
  useStateSpy.mockImplementation(init => [init, setState])

  // Create initial props that get passed into the component
  const initialProps = {
    location: {
      state: {
        from: {
          pathname: "/",
        },
      },
    },
  }

  // what to do before each test
  beforeEach(() => {
    // Render the login form component, pass in props. (Shallow method renders the component without its children.)
    wrapper = shallow(<LoginForm {...initialProps} />)
  })

  // what to do after each test
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Unit testing
  describe("Unit tests", () => {
    // UI Integrity test
    it("should match the snapshot", () => {
      // snapshots are text references of the html of the rendered component.
      expect(wrapper.html()).toMatchSnapshot()
    })

    it("should have a username inputs", () => {
      const usernameInput = wrapper.find("#username")
      expect(usernameInput.length).toEqual(1)
    })

    it("should have the expected props on the username field", () => {
      const usernameInput = wrapper.find("#username")
      expect(usernameInput.props()).toEqual({
        id: "username",
        name: "username",
        value: "",
        onChange: expect.any(Function),
        required: true,
      })
    })

    it("should have a password field", () => {
      const passwordInput = wrapper.find("#password")
      expect(passwordInput.length).toEqual(1)
    })

    it("should have the expected props on the password field", () => {
      const passwordInput = wrapper.find("#password")
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
      const signInButton = wrapper.find(Button)
      expect(signInButton.length).toEqual(1)
    })

    it("should have the expected props on the button", () => {
      const signInButton = wrapper.find(Button)
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

  // Integrations Testing
  describe("Integrations tests", () => {
    it("should update the username state onChange of username input", () => {
      const usernameInput = wrapper.find("#username")
      usernameInput.simulate("change", {
        target: {
          value: "admin",
        },
      })
      expect(setState).toHaveBeenCalledWith("admin")
      expect(usernameInput.value).toEqual("admin")
    })

    it("should update the password state onChange of password input", () => {
      const passwordInput = wrapper.find("#password")
      passwordInput.simulate("change", {
        target: {
          value: "passsword123",
        },
      })
      expect(setState).toHaveBeenCalledWith("passsword123")
    })

    // it("should call the login functionwhen sign in button is clicked", () => {
    //   signInButton.simulate("click")
    // })
  })
})
