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
import QueueTableDropdown from "./QueueTableDropdown/QueueTableDropdown"
import { QueueStoreContext } from "../../../stores/QueueStore"
import { rootStoreContext } from "../../../stores/RootStore"
import NotesDialog from "../../NotesDialog"
import { useHistory } from "react-router-dom"
import { STATUS_OPTIONS, URGENCY_OPTIONS } from "../../../constants"

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

const QueueTable = observer(({ queueData }) => {
  const queueStore = useContext(QueueStoreContext)
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const classes = useStyles()
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [notesVisit, setNotesVisit] = useState(1)
  const history = useHistory()

  const handleNotesClick = visitId => {
    setNotesVisit(visitId)
    toggleVisibleDialog()
  }

  const toggleVisibleDialog = () => {
    setVisibleDialog(!visibleDialog)
  }

  const seenHandler = id => {
    queueStore.updateStatus(queueData, id.id, "SEEN")
  }

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
        title={queueStore.queues[queueData].name}
        className={classes.table}
        localization={{ body: { emptyDataSourceMessage: "Queue is empty" } }}
        options={{ search: false, sorting: true }}
        data={queueStore.queues[queueData].participants.map(x => ({
          urgency: x.urgency,
          first: x.participant.first_name,
          last: x.participant.last_name,
          uid: x.participant.pp_id,
          timeElapsed: moment(x.status.created_at).format("LT"),
          waitTime: moment(x.status.created_at).fromNow(true),
          status: x.status.event_type,
          service: x.service.name,
          seen: false,
          notes: x.notes,
          id: x.id,
          programId: x.program, // program is just an id on this object
          serviceId: x.service.id,
          participantId: x.participant.id,
          last_four_ssn: x.participant.last_four_ssn,
          date_of_birth: x.participant.date_of_birth,
          start_date: x.participant.start_date,
          is_insured: x.participant.is_insured,
          insurer: x.participant.insurer,
          race: x.participant.race,
          gender: x.participant.gender,
        }))}
        actions={[
          {
            icon: "assignmentIndIcon",
            tooltip: "Edit Participant",
            onClick: (event, rowData) => {
              participantStore.setParticipant({
                id: rowData.participantId,
                first_name: rowData.first,
                last_name: rowData.last,
                last_four_ssn: rowData.last_four_ssn,
                date_of_birth: rowData.date_of_birth,
                start_date: rowData.start_date,
                pp_id: rowData.uid,
                race: rowData.race,
                gender: rowData.gender,
                is_insured: rowData.is_insured,
                insurance_type: rowData.insurance_type,
                insurer: rowData.insurer,
              })
              participantStore.setVisit({
                id: rowData.id,
                participant: rowData.participantId,
                program: rowData.programId,
                service: rowData.serviceId,
                notes: rowData.notes ? rowData.notes : "",
                urgency: rowData.urgency,
              })
              history.push("/existingParticipant")
            },
          },
        ]}
        columns={[
          {
            title: "Urgency",
            //eslint-disable-next-line
            render: ({ id, urgency }) => (
              <QueueTableDropdown
                id={id}
                initialValue={urgency}
                items={URGENCY_OPTIONS}
                queueData={queueData}
                column="urgency"
              />
            ),
            customSort: (a, b) => +a.urgency - +b.urgency,
          },
          { title: "First", field: "first" },
          { title: "Last", field: "last" },
          { title: "UID", field: "uid" },
          {
            title: "Time",
            field: "timeElapsed",
            customSort: (a, b) =>
              new Date("1970/01/01 " + a.timeElapsed) -
              new Date("1970/01/01 " + b.timeElapsed),
          },
          {
            title: "Wait Time",
            field: "waitTime",
          },
          {
            title: "Status",
            //eslint-disable-next-line
            render: ({ id, status }) => (
              <QueueTableDropdown
                id={id}
                initialValue={status}
                items={STATUS_OPTIONS}
                queueData={queueData}
                column="status"
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
            render: ({ id }) => <NotesButton id={id} />,
          },
        ]}
      />
      <NotesDialog
        visibleDialog={visibleDialog}
        toggleVisibleDialog={toggleVisibleDialog}
        queueData={queueData}
        id={notesVisit.id}
      />
    </Paper>
  )
})

QueueTable.propTypes = {
  queueData: PropTypes.number,
}

export default QueueTable
