import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import Participants from "../src/components/Participants"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import TableCell from "@material-ui/core/TableCell"
import Typography from "@material-ui/core/Typography"

configure({ adapter: new Adapter() })

describe("<Participants />", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Participants />)
  })

  it("should render a Breadcrumbs Material-UI component", () => {
    expect(wrapper.find(Breadcrumbs))
  })

  // the reason for 7 and not all the other cells, is because the initial render only has 7 table cells that are the header cells.
  it("should render 7 TableCell Material-UI components on initial render", () => {
    // wrapper.setProps({prop: value}) for setting any initial props
    expect(wrapper.find(TableCell)).toHaveLength(7)
  })

  it("should render 7 TableCell Material-UI components on initial render", () => {
    // wrapper.setProps({prop: value}) for setting any initial props
    expect(wrapper.contains(<Typography>#</Typography>))
  })
})
