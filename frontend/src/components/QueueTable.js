import React, { useState } from "react"
import PropTypes from "prop-types"
import { set, get } from "lodash"
import MaterialTable from "material-table"
import Grid from "@material-ui/core/Grid"
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/core/styles"
import ParticipantSearch from "../components/ParticipantSearch"

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
    const newState = set(state, [id, value], event.target.checked)
    setState({
      ...state,
      ...newState,
    })
  }

  const checkbox = (rowData, value) => (
    <Checkbox
      checked={get(state, [rowData.id, value])}
      onChange={handleCheck(rowData.id, value)}
    />
  )

  return (
    <Grid className={classes.root}>
      <ParticipantSearch />
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
    </Grid>
  )
}

QueueTable.propTypes = {
  rows: PropTypes.array,
  classes: PropTypes.object,
  queueName: PropTypes.string,
}

export default withStyles(styles)(QueueTable)
