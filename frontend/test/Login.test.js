/* eslint-disable quotes */
import React from "react"
import { shallow, configure } from "enzyme"
import { render, fireEvent, cleanup } from "@testing-library/react"
import Adapter from "enzyme-adapter-react-16"
import { createMount } from "@material-ui/core/test-utils"

import LoginForm from "../src/views/LoginForm"
import PrevPointButton from "../src/components/PrevPointButton"
import { RootStore, RootStoreContext } from "../src/stores/RootStore"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import { BrowserRouter } from "react-router-dom"

configure({ adapter: new Adapter() })
const theme = createMuiTheme({})

describe("<LoginForm />", () => {
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

  let wrapper
  let usernameInput
  let passwordInput
  let signInButton

  // Unit testing
  describe("Unit tests", () => {
    const mount = createMount()
    // what to do before each test
    beforeEach(() => {
      // Render the login form component, pass in props. (Shallow method renders the component without its children, good for unit tests.)
      wrapper = mount(
        <RootStoreContext.Provider value={new RootStore()}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <LoginForm {...initialProps} />
            </BrowserRouter>
          </ThemeProvider>
        </RootStoreContext.Provider>
      )
      usernameInput = wrapper.find("#username")
      passwordInput = wrapper.find("#password")
      signInButton = wrapper.find(PrevPointButton)
    })

    // what to do after each test
    afterEach(() => {
      jest.clearAllMocks()
    })

    // UI Integrity test
    it("should match the snapshot", () => {
      // snapshots are text references of the html of the rendered component.
      expect(wrapper.html()).toMatchSnapshot()
    })

    it("should have a username inputs", () => {
      expect(usernameInput.hostNodes().length).toEqual(1)
    })

    it("should have the expected props on the username field", () => {
      expect(usernameInput.first().props()).toEqual({
        id: "username",
        name: "username",
        value: "",
        type: "username",
        onChange: expect.any(Function),
        required: true,
      })
    })

    it("should have a password field", () => {
      expect(passwordInput.hostNodes().length).toEqual(1)
    })

    it("should have the expected props on the password field", () => {
      expect(passwordInput.first().props()).toEqual({
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
      expect(signInButton.first().props()).toEqual({
        size: "small",
        type: "submit",
        disabled: false,
        color: "primary",
        children: "Sign In",
        onClick: expect.any(Function),
      })
    })
  })

  // Integrations Testing
  describe("Integrations tests", () => {
    beforeEach(() => {
      // Render the login form component, pass in props. (render method renders the component with its children, good for integrations tests, uses react-test-library.)
      const { getByLabelText } = render(
        <RootStoreContext.Provider value={new RootStore()}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <LoginForm {...initialProps} />
            </BrowserRouter>
          </ThemeProvider>
        </RootStoreContext.Provider>
      )
      usernameInput = getByLabelText(/Username/i)
      passwordInput = getByLabelText(/Password/i)
    })

    afterEach(cleanup)

    it("Username text change in onChange event", () => {
      expect(usernameInput.value).toBe("")

      fireEvent.change(usernameInput, { target: { value: "James" } })

      expect(usernameInput.value).toBe("James")
    })

    it("Password text change in onChange event", () => {
      expect(passwordInput.value).toBe("")

      fireEvent.change(passwordInput, { target: { value: "mypassword" } })

      expect(passwordInput.value).toBe("mypassword")
    })

    it("Test button submit", () => {
      const mockLogin = jest.fn()

      const button = shallow(<PrevPointButton onClick={mockLogin} />)

      button.simulate("click")

      expect(mockLogin.mock.calls.length).toEqual(1)
    })
  })
})
