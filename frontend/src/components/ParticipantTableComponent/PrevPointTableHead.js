import React from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import PrevPointTitle from "../Typography/PrevPointTitle"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  mobileVisibility: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    mobileVisibility: {
      display: "table-cell",
    },
  },
}))

const PrevPointTableHead = ({ headerTitles }) => {
  const classes = useStyles()

  return (
    <TableHead aria-label="thead">
      <TableRow>
        {headerTitles
          ? headerTitles.map(({ title, mobile }, index) => (
            <TableCell
              key={`${title}_${index}`}
              aria-label="cell"
              className={mobile ? "" : classes.mobileVisibility}
            >
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
