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
import TableBody from "@material-ui/core/TableBody"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import Fab from "@material-ui/core/Fab"
import PrevPointCopy from "../../components/Typography/PrevPointCopy"
import { Link } from "react-router-dom"

const PrevPointTableBody = props => {
  return (
    <TableBody>
      {props.participants.length < 1 ? (
        <h5>Sorry no participants found</h5>
      ) : null}
      {props.participants.map(participant => (
        <TableRow
          key={participant.id}
          onClick={e => props.handleClick(e, participant)}
        >
          <TableCell>
            <PrevPointCopy>{participant.pp_id} </PrevPointCopy>
          </TableCell>
          <TableCell>
            <PrevPointCopy>{participant.first_name}</PrevPointCopy>
          </TableCell>
          <TableCell>
            <PrevPointCopy>{participant.last_name}</PrevPointCopy>
          </TableCell>
          <TableCell>
            <PrevPointCopy>{participant.gender}</PrevPointCopy>
          </TableCell>
          <TableCell>
            <PrevPointCopy>{participant.date_of_birth}</PrevPointCopy>
          </TableCell>
          <TableCell>
            <PrevPointCopy>{participant.race}</PrevPointCopy>
          </TableCell>
          <TableCell>
            <Link to="/participantInfo">
              <Fab color="primary" size="small" aria-label="add">
                <AssignmentIndIcon />
              </Fab>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

PrevPointTableBody.propTypes = {
  participants: PropTypes.array,
  handleClick: PropTypes.func,
}

export default PrevPointTableBody
