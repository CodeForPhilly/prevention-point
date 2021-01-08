import { render } from "@testing-library/react"
import { shallow } from "enzyme"
import React from "react"
import PrevPointButton from "../src/components/PrevPointButton"

// Test the following things:
// 1. Button type: submit or button
// 2. Disabled: true or false
// 3. onclick function
describe("<PrevPointButton />", () => {
  const mockOnClick = jest.fn()
  const text = "Search"
  let props

  beforeEach(() => {
    props = {
      size: "small",
      type: "submit",
      disabled: false,
      color: "primary",
      onClick: mockOnClick,
    }
  })
  it("should render a PrevPointButton component", () => {
    const buttonWrapper = render(
      <PrevPointButton {...props}>{text}</PrevPointButton>
    )
    expect(buttonWrapper).toMatchSnapshot()
  })

  it("should render a PrevPointButton component with Search text", () => {
    const buttonWrapper = render(
      <PrevPointButton {...props}>{text}</PrevPointButton>
    )
    const button = buttonWrapper.queryByText("Search")
    expect(button).toHaveTextContent("Search")
  })

  it("Should have a button type of submit", () => {
    const button = shallow(<PrevPointButton {...props}>{text}</PrevPointButton>)
    expect(button.props().type).toBe("submit")
  })

  it("should have disabled set to false", () => {
    const button = shallow(<PrevPointButton {...props}>{text}</PrevPointButton>)
    expect(button.props().disabled).toBe(false)
  })

  it("should have working onclick function", () => {
    const button = shallow(<PrevPointButton {...props}>{text}</PrevPointButton>)
    button.simulate("click")
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
