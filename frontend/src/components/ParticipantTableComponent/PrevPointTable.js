import React from "react"
import PropTypes from "prop-types"
import PrevPointTableBody from "./PrevPointTableBody"
import PrevPointTableHead from "./PrevPointTableHead"
import Table from "@material-ui/core/Table"

const PrevPointTable = props => {
  return (
    <Table aria-label="list of participants">
      <PrevPointTableHead {...props} />
      <PrevPointTableBody {...props} />
    </Table>
  )
}

PrevPointTable.propTypes = {
  headerTitles: PropTypes.array,
  participants: PropTypes.array,
  handleClick: PropTypes.func,
}

export default PrevPointTable
