import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import EditIcon from "@material-ui/icons/Edit"
import CheckIcon from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"
import MaterialTable from "material-table"
import moment from "moment"
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
const NotesButton = ({ toggleVisibleDialog }) => {
  return (
    <IconButton onClick={toggleVisibleDialog}>
      <EditIcon />
    </IconButton>
  )
}
NotesButton.propTypes = {
  toggleVisibleDialog: PropTypes.func.isRequired,
}

const SeenButton = () => {
  return (
    <IconButton>
      <CheckIcon />
    </IconButton>
  )
}
const QueueTable = observer(
  ({ queueStore: { queueStats, queues }, queueData }) => {
    const classes = useStyles()
    const [queueItem, setQueueItem] = useState()
    const toggleVisibleDialog = data => () => {
      setQueueItem(data)
    }
    const visibleDialog = Boolean(queueItem)
    const statusOptions = [
      { value: "ARRIVED", name: "Arrived" },
      { value: "SEEN", name: "Seen" },
      { value: "STEPPED_OUT", name: "Stepped Out" },
      { value: "CAME_BACK", name: "Came Back" },
      { value: "LEFT", name: "Left" },
    ]
    const urgencyOptions = [
      { value: 1, name: 1 },
      { value: 2, name: 2 },
      { value: 3, name: 3 },
      { value: 4, name: 4 },
      { value: 5, name: 5 },
    ]
    return (
      <Paper className={classes.root}>
        <MaterialTable
          title={queueStats[queueData].name}
          className={classes.table}
          options={{
            search: false,
          }}
          data={queues[queueData].map(
            ({
              urgency,
              notes,
              participant: { last_name, pp_id },
              status: { created_at, event_type },
              service: { name },
            }) => ({
              urgency,
              last: last_name,
              uid: pp_id,
              timeElapsed: moment(created_at).format("LT"),
              status: event_type,
              service: name,
              seen: false, // duplicate of status?
              notes,
            })
          )}
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
            { title: "Service", field: "service" },
            {
              title: "Seen",
              //eslint-disable-next-line
            render: ({ id }) => <SeenButton id={id} />,
            },
            {
              title: "Notes",
              //eslint-disable-next-line
            render: data => <NotesButton toggleVisibleDialog={toggleVisibleDialog(data)} />,
            },
          ]}
        />
        {visibleDialog && (
          <NotesDialog
            visibleDialog={visibleDialog}
            queueItem={queueItem}
            toggleVisibleDialog={toggleVisibleDialog()}
          />
        )}
      </Paper>
    )
  }
)

QueueTable.propTypes = {
  queueData: PropTypes.number,
}

export default QueueTable
