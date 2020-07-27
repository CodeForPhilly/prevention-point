import React, { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"

import PrevPointButton from "./PrevPointButton"
import { QueueStoreContext } from "../stores/QueueStore"

const NotesDialog = observer(
  ({ visibleDialog, toggleVisibleDialog, queueData, id }) => {
    const queueStore = useContext(QueueStoreContext)

    const handleSubmit = (queueId, visitId) => {
      queueStore.patchVisit(queueId, visitId, {
        notes: queueStore.participantNotes,
      })
      toggleVisibleDialog()
    }

    useEffect(() => {
      queueStore.setParticipantNotes(queueStore.getNotes(queueData, id))
    }, [queueStore, queueStore.getNotes, queueData, id])

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
          <DialogContentText>Enter a note:</DialogContentText>
          <TextField
            id="notes"
            type="text"
            placeholder="Enter new note here"
            margin="dense"
            autoFocus
            fullWidth
            multiline
            onChange={e => queueStore.setParticipantNotes(e.target.value)}
            value={queueStore.participantNotes}
          />
          <DialogActions>
            <PrevPointButton color="default" onClick={toggleVisibleDialog}>
              Cancel
            </PrevPointButton>
            <PrevPointButton
              onClick={() =>
                handleSubmit(queueData, id, queueStore.participantNotes)
              }
            >
              Submit
            </PrevPointButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
)

NotesDialog.propTypes = {
  visibleDialog: PropTypes.bool,
  toggleVisibleDialog: PropTypes.func,
  queueData: PropTypes.number,
  id: PropTypes.number,
}

export default NotesDialog
