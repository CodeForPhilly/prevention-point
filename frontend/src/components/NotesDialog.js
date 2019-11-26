import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"

function NotesDialog({ toggleVisibleDialog, queueItem, visibleDialog }) {
  // const [participantNotes, setParticipantNotes] = useState(
  //   visibleDialog ? queueItem.notes : ""
  // )

  // const handleSubmit = () => {
  //   // Make POST request to API here to submit data
  //   // Need to pass in visit ID to this component (most likely) for API
  //   toggleVisibleDialog()
  // }

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
        <TextField
          id="notes"
          type="text"
          label="Participant note"
          placeholder="Enter a note about this participant"
          margin="dense"
          autoFocus
          fullWidth
          multiline
          // onChange={e => setParticipantNotes(e.target.value)}
          // value={participantNotes}
          InputProps={{ readOnly: true }}
          value={queueItem.notes}
        />
        <DialogActions>
          <Button id="cancel" onClick={toggleVisibleDialog}>
            Ok
          </Button>
          {/* <Button id="submit" onClick={handleSubmit} color="primary">
            Submit
          </Button> */}
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
NotesDialog.defaultProps = {
  queueItem: null,
}
NotesDialog.propTypes = {
  visibleDialog: PropTypes.bool.isRequired,
  toggleVisibleDialog: PropTypes.func.isRequired,
  queueItem: PropTypes.shape({
    id: PropTypes.string,
    notes: PropTypes.string,
  }),
}

export default NotesDialog
