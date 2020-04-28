import React from "react"
import { Tab } from "@material-ui/core"
import QueueTabContent from "./../QueueTabContent/QueueTabContent"

const QueueTab = props => {
  return (
    <Tab
      component={QueueTabContent}
      onClick={e => e.preventDefault()}
      {...props}
    />
  )
}

export default QueueTab
