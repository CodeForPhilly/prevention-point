import React from "react"
import { Tab } from "@material-ui/core"
import QueueTabContent from "./../QueueTabContent/QueueTabContent"

const QueueTab = props => (
  <Tab
    {...props}
    disableRipple
    component={QueueTabContent}
    onClick={e => e.preventDefault()}
  />
)

export default QueueTab
