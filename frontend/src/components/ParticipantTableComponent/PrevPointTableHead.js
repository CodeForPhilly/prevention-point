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

const PrevPointTableHead = ({
  headerTitles,
  sidebarView,
  forParticipantTable = true,
}) => {
  const classes = useStyles()
  const [linkTitle, setLinkTitle] = useState({
    mobile: true,
    title: sidebarView === SEARCH ? "Edit Participant" : "Populate SEP Form",
  })
  const [allTitles, setAllTitles] = useState(headerTitles)

  useEffect(() => {
    if (sidebarView === SEARCH) {
      setLinkTitle({ mobile: true, title: "Edit Participant" })
    } else {
      setLinkTitle({ mobile: true, title: "Populate SEP Form" })
    }
  }, [sidebarView])

  useEffect(() => {
    if (forParticipantTable) {
      // if this header component starts to be used a lot, we can swap the default value to false
      setAllTitles([...headerTitles, linkTitle])
    }
  }, [forParticipantTable, headerTitles, linkTitle])

  return (
    <TableHead aria-label="thead">
      <TableRow>
        {headerTitles
          ? allTitles.map(({ title, mobile }, index) => (
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
  forParticipantTable: PropTypes.bool,
}

export default PrevPointTableHead
