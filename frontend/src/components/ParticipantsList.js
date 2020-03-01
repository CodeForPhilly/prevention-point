import React, { Fragment, useContext } from "react"
import { rootStoreContext } from "../stores/RootStore"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Fab from "@material-ui/core/Fab"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const ParticipantsList = observer(() => {
  const useStyles = makeStyles({
    addParticipantNav: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#d4d4d4",
      height: "auto",
    },
    addParticipant: {
      float: "right",
    },
    addParticipantText: {
      float: "left",
      color: "primary",
      fontWeight: "bold",
      marginRight: "1em",
      display: "inline-block",
      verticalAlign: "middle",
      lineHeight: "normal",
    },
  })
  const classes = useStyles()

  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore

  const handleParticipant = (e, participant) => {
    participantsStore.setParticipant(participant)
    participantsStore.setVisit(undefined)
  }

  return (
    <Fragment>
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
                  <Typography>Edit Participant</Typography>
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
        <BottomNavigation showLabels className={classes.addParticipantNav}>
          <Link
            to="/participantInfo"
            onClick={() => {
              participantsStore.setParticipant(undefined)
              participantsStore.setVisit(undefined)
            }}
          >
            <Grid container>
              <Grid container item justify="flex-end">
                <Typography
                  color="primary"
                  style={{ fontSize: 28, paddingRight: "0.75em" }}
                >
                  Add Participant
                </Typography>
                <PersonAddIcon color="primary" style={{ fontSize: 50 }} />
              </Grid>
            </Grid>
          </Link>
        </BottomNavigation>
      </div>
    </Fragment>
  )
})

export default ParticipantsList
