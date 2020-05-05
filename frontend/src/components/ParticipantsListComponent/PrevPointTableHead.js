// TODO:
/**
 * 1. Breakup into participant and visit child components
 * 2. Break fields into smaller individual components for re-use in other forms
 * 3. Break up state in MobX for field re-use
 */

/* eslint-disable indent */
import React from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import PrevPointTitle from "../../components/Typography/PrevPointTitle"

const PrevPointTableHead = props => {
  return (
    <TableHead>
      <TableRow>
        {props.headerTitles.map((title, index) => (
          <TableCell key={index}>
            <PrevPointTitle>{title}</PrevPointTitle>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

PrevPointTableHead.propTypes = {
  headerTitles: PropTypes.array,
}

export default PrevPointTableHead
