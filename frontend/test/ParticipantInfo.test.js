import React from "react"
import { render, act, screen } from "@testing-library/react"
import ParticipantInfo from "../src/components/ParticipantInfo"
import { BrowserRouter } from "react-router-dom"
import { rootStoreContext } from "../src/stores/RootStore"
import App from "../src/App"

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

beforeAll(async () => {
  render(<App />)
  await act(async () => {
    await rootStoreContext._currentValue.ParticipantStore.setDefaultParticipant()
    await rootStoreContext._currentValue.ParticipantStore.setGender("Female")
  })
})

describe("ParticipantInfo Tests", () => {
  it("should render without errors w/ no props", () => {
    render(<ParticipantInfo />, { wrapper: Wrapper })
  })

  it("display 'Female' in Gender select if current participant is Female", async () => {
    render(<ParticipantInfo />, { wrapper: Wrapper })
    expect(screen.getByTestId("gender-select").childNodes[1].value).toBe(
      "Female"
    )
  })
})
