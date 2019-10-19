import React from "react"
import PropTypes, { shape } from "prop-types"
import { makeStyles } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import EditIcon from "@material-ui/icons/Edit"
import CheckIcon from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"
import MaterialTable from "material-table"
import QueueTableDropdown from "./QueueTableDropdown"
import NotesDialog from "./NotesDialog"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}))

function QueueTable({ queueData: { name, rows } }) {
  const [visibleDialog, setVisibleDialog] = React.useState(false)

  const toggleVisibleDialog = () => {
    setVisibleDialog(!visibleDialog)
  }

  const classes = useStyles()
  const statusOptions = [
    { value: "checkedIn", name: "Checked In" },
    { value: "absent", name: "Absent" },
    { value: "returned", name: "Returned" },
  ]
  const urgencyOptions = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
    { value: 4, name: 4 },
    { value: 5, name: 5 },
  ]

  const NotesButton = () => {
    return (
      <IconButton onClick={toggleVisibleDialog}>
        <EditIcon />
      </IconButton>
    )
  }
  const SeenButton = () => {
    return (
      <IconButton>
        <CheckIcon />
      </IconButton>
    )
  }
  return (
    <Paper className={classes.root}>
      <MaterialTable
        title={name}
        className={classes.table}
        data={rows}
        columns={[
          {
            title: "Urgency",
            //eslint-disable-next-line
            render: ({ id, urgency }) => (
              <QueueTableDropdown
                id={id}
                initialValue={urgency}
                items={urgencyOptions}
              />
            ),
          },
          { title: "Last", field: "last" },
          { title: "UID", field: "uid" },
          { title: "Time", field: "timeElapsed" },
          {
            title: "Status",
            //eslint-disable-next-line
            render: ({ id, status }) => (
              <QueueTableDropdown
                id={id}
                initialValue={status}
                items={statusOptions}
              />
            ),
          },
          {
            title: "Seen",
            //eslint-disable-next-line
            render: ({ id }) => <SeenButton id={id} />,
          },
          {
            title: "Notes",
            //eslint-disable-next-line
            render: ({ id }) => <NotesButton id={id} />,
          },
        ]}
      />
      <NotesDialog
        visibleDialog={visibleDialog}
        toggleVisibleDialog={toggleVisibleDialog}
      />
    </Paper>
  )
}

QueueTable.propTypes = {
  queueData: shape({
    rows: PropTypes.array,
    name: PropTypes.string,
  }),
}

export default QueueTable
