import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
//import Button from "@material-ui/core/Button"
//import TableCell from "@material-ui/core/TableCell"
//import Typography from "@material-ui/core/Typography"
//import UserSearch from "../src/components/UserSearch"
//import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
//import { createMount } from "@material-ui/core/test-utils"
//hello world reference
import App from "../src/App"

configure({ adapter: new Adapter() })

//hello world test

describe("Render the app", () => {
  it("renders without crashing", () => {
    shallow(<App />)
  })
})

describe("<UserSearch />", () => {
  //let shallow
  //let button

  before(() => {
    shallow = createShallow() 
  })

  it("should work", () => {
//    const wrapper = shallow(<UserSearch />)
  })
})
