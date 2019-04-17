import React from "react"
import PropTypes from "prop-types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles,
} from "@material-ui/core"

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
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Urgent?</TableCell>
            <TableCell align="right">UID</TableCell>
            <TableCell align="right">Last</TableCell>
            <TableCell align="right">First</TableCell>
            <TableCell align="right">Time Elapsed (min)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.urgent}
              </TableCell>
              <TableCell align="right">{row.uid}</TableCell>
              <TableCell align="right">{row.last}</TableCell>
              <TableCell align="right">{row.first}</TableCell>
              <TableCell align="right">{row.timeElapsed}</TableCell>
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
