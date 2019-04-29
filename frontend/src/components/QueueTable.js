import React, { useState } from "react"
import PropTypes from "prop-types"
import { Paper, withStyles, Checkbox } from "@material-ui/core"
import _ from "lodash"
import MaterialTable from "material-table"

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

function QueueTable({ queueName, rows, classes }) {
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

  const checkbox = (rowData, value) => (
    <Checkbox
      checked={_.get(state, [rowData.id, value])}
      onChange={handleCheck(rowData.id, value)}
    />
  )

  return (
    <Paper className={classes.root}>
      <MaterialTable
        className={classes.table}
        columns={[
          { title: "Urgency", field: "urgency" },
          { title: "UID", field: "uid" },
          { title: "First", field: "first" },
          { title: "Last", field: "last" },
          { title: "Time", field: "timeElapsed" },
          {
            title: "Called",
            field: "called",
            render: rowData => checkbox(rowData, "called"),
          },
          {
            title: "Seen",
            field: "seen",
            render: rowData => checkbox(rowData, "seen"),
          },
        ]}
        data={rows}
        title={queueName}
      />
    </Paper>
  )
}

QueueTable.propTypes = {
  rows: PropTypes.array,
  classes: PropTypes.object,
  queueName: PropTypes.string,
}

export default withStyles(styles)(QueueTable)
