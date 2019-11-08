import React, { useContext } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import { QueueStoreContext } from "../stores/QueueStore"

function NotesDialog({ visibleDialog, toggleVisibleDialog, queueData, id }) {
  const queueStore = useContext(QueueStoreContext)
  const [participantNotes, setParticipantNotes] = React.useState("")

  const handleSubmit = (queueId, visitId) => {
    queueStore.patchVisit(queueId, visitId, { notes: participantNotes })
    toggleVisibleDialog()
  }

  const getNote = () => {
    const array = queueStore.queues[queueData].filter(x => x.id === id)
    if (array) {
      return "Array was found!"
    }
    //console.log(array[0])
    return "Enter a note!"
  }

  return (
    <Dialog
      open={visibleDialog}
      onClose={toggleVisibleDialog}
      aria-labelledby="note-dialog-title"
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle id="note-dialog-title">Participant Notes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a note about this participant.
        </DialogContentText>
        <TextField
          id="notes"
          type="text"
          placeholder={getNote()}
          margin="dense"
          autoFocus
          fullWidth
          multiline
          onChange={e => setParticipantNotes(e.target.value)}
          value={queueStore.queues[queueData].filter(x => x.id === id).notes}
        />
        <DialogActions>
          <Button id="cancel" onClick={toggleVisibleDialog}>
            Cancel
          </Button>
          <Button
            id="submit"
            onClick={() => handleSubmit(queueData, id, participantNotes)}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

NotesDialog.propTypes = {
  visibleDialog: PropTypes.bool,
  toggleVisibleDialog: PropTypes.func,
  queueData: PropTypes.number,
  id: PropTypes.number,
}

export default NotesDialog
