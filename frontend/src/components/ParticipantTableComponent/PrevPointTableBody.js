import React from "react"
import PropTypes from "prop-types"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import Fab from "@material-ui/core/Fab"
import PrevPointCopy from "../Typography/PrevPointCopy"
import { Link } from "react-router-dom"

const PrevPointTableBody = props => {
  return (
    <TableBody aria-label="tbody">
      {props.participants.length < 1 ? (
        <h5>Sorry no participants found</h5>
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
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.gender}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.date_of_birth}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              <PrevPointCopy>{participant.race}</PrevPointCopy>
            </TableCell>
            <TableCell aria-label="tcell">
              <Link
                to="/participantInfo"
                onClick={() => props.handleClick(participant)}
              >
                <Fab color="primary" size="small" aria-label="add">
                  <AssignmentIndIcon />
                </Fab>
              </Link>
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
}

export default PrevPointTableBody
