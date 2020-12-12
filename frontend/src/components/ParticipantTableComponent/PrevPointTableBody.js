import React from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn"
import Fab from "@material-ui/core/Fab"
import PrevPointCopy from "../Typography/PrevPointCopy"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { SEARCH, SEP } from "../../constants"

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

const PrevPointTableBody = props => {
  const classes = useStyles()

  return (
    <TableBody aria-label="tbody">
      {props.participants.length < 1 ? (
        <TableRow aria-label="trow">
          <TableCell aria-label="tcell">Sorry no participants found</TableCell>
        </TableRow>
      ) : (
        props.participants.map(participant => (
          <TableRow key={participant.id} aria-label="trow">
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.pp_id} </PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.first_name}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.last_name}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell" className={classes.mobileVisibility}>
              <PrevPointCopy>{participant.sep_id} </PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell" className={classes.mobileVisibility}>
              <PrevPointCopy>{participant.gender}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell" className={classes.mobileVisibility}>
              <PrevPointCopy>
                {new Date(participant.date_of_birth).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "UTC", //the the database's Datefield is not timezone aware, so without the localestring assumes UTC. this was causing an off by one error
                  }
                )}
              </PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell" className={classes.mobileVisibility}>
              <PrevPointCopy>{participant.race}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              {props.sidebarView === SEARCH && (
                <Link
                  to={`/participants/${participant.id}/visits`}
                  onClick={() => props.handleClick(participant)}
                >
                  <Fab color="primary" size="small" aria-label="add">
                    <AssignmentIndIcon />
                  </Fab>
                </Link>
              )}
              {props.sidebarView === SEP && (
                <Fab
                  color="primary"
                  size="small"
                  aria-label="add"
                  onClick={() => props.handleSEPPopulation(participant)}
                >
                  <AssignmentReturnIcon />
                </Fab>
              )}
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  )
}

PrevPointTableBody.propTypes = {
  participants: PropTypes.array,
  handleClick: PropTypes.func,
  sidebarView: PropTypes.string,
  handleSEPPopulation: PropTypes.func,
}

export default PrevPointTableBody
