import React, { Fragment, useContext, useEffect, useState } from "react"
import { rootStoreContext } from "../stores/RootStore"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"

const ParticipantsList = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore
  const [isLoading, setIsLoading] = useState(false)

  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    setIsLoading(true)
    participantsStore.getParticipants()
    participantsStore.getInsurers()
    setIsLoading(false)
  }, [participantsStore])

  const handleParticipant = (e, participant) => {
    participantsStore.setParticipant(participant)
  }

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">Search Results</Typography>
          </Breadcrumbs>
          <Typography variant="h5" color="textPrimary">
            Participants
          </Typography>
          <div className="participants">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>#</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>PPID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>First Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Last Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Gender</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>DOB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Race</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Edit Participant Info</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantsStore.participants.map((participant, index) => (
                  <TableRow
                    key={index}
                    onClick={e => handleParticipant(e, participant)}
                  >
                    <TableCell>
                      <Typography>Number</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.pp_id} </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.first_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.last_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.gender}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.date_of_birth}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.race}</Typography>
                    </TableCell>
                    <TableCell>
                      <Link to="/participantInfo">
                        <Fab color="primary" size="small" aria-label="add">
                          <AssignmentIndIcon />
                        </Fab>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Fab color="primary" aria-label="add" size="large">
            <AddIcon />
          </Fab>
        </div>
      )}
    </Fragment>
  )
})

export default ParticipantsList
