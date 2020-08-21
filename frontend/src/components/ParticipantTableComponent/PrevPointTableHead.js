import React from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import PrevPointTitle from "../Typography/PrevPointTitle"

const PrevPointTableHead = ({ headerTitles }) => {
  return (
    <TableHead aria-label="thead">
      <TableRow>
        {headerTitles && headerTitles.length > 0
          ? headerTitles.map((title, index) => (
              <TableCell key={`${title}_${index}`} aria-label="cell">
                <PrevPointTitle>{title}</PrevPointTitle>
              </TableCell>
            ))
          : null}
      </TableRow>
    </TableHead>
  )
}

PrevPointTableHead.propTypes = {
  headerTitles: PropTypes.array,
}

export default PrevPointTableHead
