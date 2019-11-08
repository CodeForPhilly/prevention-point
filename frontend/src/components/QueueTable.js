import React, { useContext, useState } from "react"
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
import { QueueStoreContext } from "../stores/QueueStore"
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

const QueueTable = observer(queueData => {
  const queueStore = useContext(QueueStoreContext)
  const classes = useStyles()
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [notesVisit, setNotesVisit] = useState(1)

  const handleNotesClick = visitId => {
    setNotesVisit(visitId)
    toggleVisibleDialog()
  }

  const toggleVisibleDialog = () => {
    setVisibleDialog(!visibleDialog)
  }

  const seenHandler = id => {
    queueStore.updateStatus(queueData["queueData"], id["id"], "SEEN")
  }

  const statusOptions = [
    { value: "ARRIVED", name: "Waiting" },
    { value: "STEPPED_OUT", name: "Stepped Out" },
    { value: "LEFT", name: "Left" },
  ]

  const urgencyOptions = [
    { value: "ONE", name: 1 },
    { value: "TWO", name: 2 },
    { value: "THREE", name: 3 },
    { value: "FOUR", name: 4 },
    { value: "FIVE", name: 5 },
  ]

  const NotesButton = visitId => {
    return (
      <IconButton onClick={() => handleNotesClick(visitId)}>
        <EditIcon />
      </IconButton>
    )
  }

  const SeenButton = i => {
    return (
      <IconButton onClick={() => seenHandler(i)}>
        <CheckIcon />
      </IconButton>
    )
  }
  return (
    <Paper className={classes.root}>
      <MaterialTable
        title={queueStore.queueStats[queueData["queueData"]].name}
        className={classes.table}
        options={{
          search: false,
        }}
        data={queueStore.queues[queueData["queueData"]].map(x => ({
          urgency: x.urgency,
          last: x.participant.last_name,
          uid: x.participant.pp_id,
          timeElapsed: moment(x.status.created_at).format("LT"),
          status: x.status.event_type,
          service: x.service.name,
          seen: false,
          notes: false,
          id: x.id,
        }))}
        columns={[
          {
            title: "Urgency",
            //eslint-disable-next-line
            render: ({ id, urgency }) => (
              <QueueTableDropdown
                id={id}
                initialValue={urgency}
                items={urgencyOptions}
                queueData={queueData["queueData"]}
                column="urgency"
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
                queueData={queueData["queueData"]}
                column="status"
              />
            ),
          },
          { title: "Service", field: "service" },
          {
            title: "Seen",
            //eslint-disable-next-line
            render: ({id }) => <SeenButton id={id} />,
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
        queueData={queueData.queueData}
        id={notesVisit.id}
      />
    </Paper>
  )
})

QueueTable.propTypes = {
  queueData: PropTypes.number,
}

export default QueueTable
