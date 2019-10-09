import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"

function NotesDialog({ visibleDialog, toggleVisibleDialog }) {
  const [participantNotes, setParticipantNotes] = React.useState("")

  const handleSubmit = () => {
    // Make POST request to API here to submit data
    // Need to pass in visit ID to this component (most likely) for API
    toggleVisibleDialog()
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
          placeholder="Enter a note about this participant"
          margin="dense"
          autoFocus
          fullWidth
          multiline
          onChange={e => setParticipantNotes(e.target.value)}
          value={participantNotes}
        />
        <DialogActions>
          <Button id="cancel" onClick={toggleVisibleDialog}>
            Cancel
          </Button>
          <Button id="submit" onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

NotesDialog.propTypes = {
  visibleDialog: PropTypes.boolean,
  toggleVisibleDialog: PropTypes.function,
}

export default NotesDialog
