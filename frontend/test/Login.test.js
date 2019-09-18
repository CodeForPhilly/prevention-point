import React from "react"
import { shallow } from "enzyme"
import LoginForm from "../src/components/LoginForm"

describe("<LoginForm /> with no props", () => {
  const container = shallow(<LoginForm />)
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot()
  })

  it("should have a password field", () => {
    /* Similar to above */
  })
  it("should have proper props for password field", () => {
    /* Trimmed for less lines to read */
  })
  it("should have a submit button", () => {
    /* */
  })
  it("should have proper props for submit button", () => {
    /* */
  })
})
