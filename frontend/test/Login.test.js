import React from "react"
import { shallow, configure, mount } from "enzyme"
import LoginForm from "../src/components/LoginForm"
import Button from "@material-ui/core/Button"
import Adapter from "enzyme-adapter-react-16"
import { fireEvent, cleanup } from "@testing-library/react"

configure({ adapter: new Adapter() })

describe("<LoginForm />", () => {
  let wrapper
  let usernameInput
  let passwordInput
  let signInButton

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

  // Unit testing
  describe("Unit tests", () => {
    // what to do before each test
    beforeEach(() => {
      // Render the login form component, pass in props. (Shallow method renders the component without its children, good for unit tests.)
      wrapper = shallow(<LoginForm {...initialProps} />)
      usernameInput = wrapper.find("#username")
      passwordInput = wrapper.find("#password")
      signInButton = wrapper.find(Button)
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

  // Integrations Testing
  describe("Integrations tests", () => {
    beforeEach(() => {
      // Render the login form component, pass in props. (Mount method renders the component with its children, good for integrations tests.)
      wrapper = mount(<LoginForm {...initialProps} />)
      usernameInput = wrapper.find("#username")
      // console.log(usernameInput.debug())
      passwordInput = wrapper.find("#password")
      signInButton = wrapper.find(Button)
    })

    afterEach(cleanup)

    it("Text in state is changed when button clicked", () => {
      expect(usernameInput.textContent).toBe(undefined)

      fireEvent.change(usernameInput, {
        target: {
          value: "admin",
        },
      })

      fireEvent.click(signInButton)

      expect(usernameInput.textContent).toBe("admin")
    })

    // it("should update the username state onChange of username input", () => {
    //   const usernameInput = wrapper.find("#username")
    //   usernameInput.simulate("change", {
    //     target: {
    //       value: "admin",
    //     },
    //   })
    //   expect(setState).toHaveBeenCalledWith("admin")
    //   expect(usernameInput.value).toEqual("admin")
    // })

    // it("should update the password state onChange of password input", () => {
    //   const passwordInput = wrapper.find("#password")
    //   passwordInput.simulate("change", {
    //     target: {
    //       value: "passsword123",
    //     },
    //   })
    //   expect(setState).toHaveBeenCalledWith("passsword123")
    // })

    // it("should call the login functionwhen sign in button is clicked", () => {
    //   signInButton.simulate("click")
    // })
  })
})
