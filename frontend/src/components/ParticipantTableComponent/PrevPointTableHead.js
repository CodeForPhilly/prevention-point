import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import PrevPointTitle from "../Typography/PrevPointTitle"
import { makeStyles } from "@material-ui/core/styles"
import { SEARCH } from "../../constants"

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

const PrevPointTableHead = ({ headerTitles, sidebarView }) => {
  const classes = useStyles()
  const [linkTitle, setLinkTitle] = useState({
    mobile: true,
    title: sidebarView === SEARCH ? "Edit Participant" : "Populate SEP Form",
  })

  useEffect(() => {
    if (sidebarView === SEARCH) {
      setLinkTitle({ mobile: true, title: "Edit Participant" })
    } else {
      setLinkTitle({ mobile: true, title: "Populate SEP Form" })
    }
  }, [sidebarView])

  return (
    <TableHead aria-label="thead">
      <TableRow>
        {headerTitles
          ? [...headerTitles, linkTitle].map(({ title, mobile }, index) => (
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
  sidebarView: PropTypes.string,
}

export default PrevPointTableHead
