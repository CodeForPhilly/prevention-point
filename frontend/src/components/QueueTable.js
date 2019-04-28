import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles,
  Checkbox,
} from "@material-ui/core"
import _ from "lodash"

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
})

function QueueTable({ rows, classes }) {
  const rowsInitialState = {}
  rows.forEach(
    row => (rowsInitialState[row.id] = { seen: row.seen, called: row.called })
  )

  const [state, setState] = useState(rowsInitialState)
  const handleCheck = (id, value) => event => {
    const newState = _.set(state, [id, value], event.target.checked)
    setState({
      ...state,
      ...newState,
    })
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Urgency</TableCell>
            <TableCell align="right">UID</TableCell>
            <TableCell align="right">First</TableCell>
            <TableCell align="right">Last</TableCell>
            <TableCell align="right">Time Elapsed (min)</TableCell>
            <TableCell align="right">Seen</TableCell>
            <TableCell align="right">Called</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.urgency}
              </TableCell>
              <TableCell align="right">{row.uid}</TableCell>
              <TableCell align="right">{row.first}</TableCell>
              <TableCell align="right">{row.last}</TableCell>
              <TableCell align="right">{row.timeElapsed}</TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={_.get(state, [row.id, "seen"])}
                  onChange={handleCheck(row.id, "seen")}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  checked={_.get(state, [row.id, "called"])}
                  onChange={handleCheck(row.id, "called")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

QueueTable.propTypes = {
  rows: PropTypes.array,
  classes: PropTypes.object,
}

export default withStyles(styles)(QueueTable)
