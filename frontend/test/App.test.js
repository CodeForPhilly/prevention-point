import React from "react"
import { shallow } from "enzyme"
import { RootStoreContext, RootStore } from "../src/stores/RootStore"

import App from "../src/App"

describe("Render the app", () => {
  it("renders without crashing", () => {
    shallow(
      <RootStoreContext.Provider value={new RootStore()}>
        <App />
      </RootStoreContext.Provider>
    )
  })
})
