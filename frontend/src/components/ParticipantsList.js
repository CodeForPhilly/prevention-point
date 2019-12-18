import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
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
import Grid from "@material-ui/core/Grid"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import Paper from "@material-ui/core/Paper"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"

const ParticipantsList = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore
  const history = useHistory()
  const handleClick = () => {
    history.push("/participants-info")
  }

  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    setIsLoading(true)
    participantsStore.getParticipants()
    setIsLoading(false)
  }, [participantsStore])

  const handleParticipant = (e, participant) => {
    participantsStore.setParticipant(participant)
  }

  return (
    <div>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/">
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
                <Typography>Add</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participantsStore.participants.map((participant, index) => (
              <TableRow key={index} onClick={handleClick}>
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
                  <Fab color="primary" size="small" aria-label="add">
                    <AddIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Paper>
          <Grid container>
            <Grid container item justify="flex-end">
              <Typography color="primary" style={{ fontSize: 30 }}>
                Add New Person
              </Typography>
              <PersonAddIcon
                color="primary"
                style={{ fontSize: 60 }}
                onClick={handleClick}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>
        <p>{participantsStore.filter("T9FN3", null, null).first_name}</p>
      </div>
    </div>
  )
})

export default ParticipantsList
