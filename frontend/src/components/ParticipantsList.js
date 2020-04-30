import React, { Fragment, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"

import Fab from "@material-ui/core/Fab"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import BottomNavigation from "@material-ui/core/BottomNavigation"

import AppCopy from "./AppCopy"
import AppTitle from "./AppTitle"
import AppHeading from "./AppHeading"
import { rootStoreContext } from "../stores/RootStore"

const ParticipantsList = observer(() => {
  const useStyles = makeStyles({
    participantsListHeading: {
      color: "#086375",
    },
    addParticipantNav: {
      width: "100%",
      position: "fixed",
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "#d4d4d4",
      height: "auto",
    },
    addParticipantLink: {
      display: "flex",
      alignItems: "center",
      padding: 20,
      color: "#086375",
    },
    addParticipantIcon: {
      marginLeft: 10,
    },
  })
  const classes = useStyles()

  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore

  useEffect(() => {
    ;(async () => {
      // kick off api calls for participants from Mobx
      await participantStore.getParticipants()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleParticipant = (e, participant) => {
    participantStore.setParticipant(participant)
    participantStore.setDefaultVisit()
    participantStore.setVisit({
      participant: participant.id,
    })
  }

  return (
    <Fragment>
      <div>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <AppCopy>Search Results</AppCopy>
        </Breadcrumbs>
        <AppHeading className={classes.participantsListHeading}>
          Participants
        </AppHeading>
        <div className="participants">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <AppTitle>PPID</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>First Name</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>Last Name</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>Gender</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>DOB</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>Race</AppTitle>
                </TableCell>
                <TableCell>
                  <AppTitle>Edit Participant</AppTitle>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participantStore.participants.length < 1 ? (
                <h5>Sorry no participants found</h5>
              ) : null}
              {participantStore.participants.map(participant => (
                <TableRow
                  key={participant.id}
                  onClick={e => handleParticipant(e, participant)}
                >
                  <TableCell>
                    <AppCopy>{participant.pp_id} </AppCopy>
                  </TableCell>
                  <TableCell>
                    <AppCopy>{participant.first_name}</AppCopy>
                  </TableCell>
                  <TableCell>
                    <AppCopy>{participant.last_name}</AppCopy>
                  </TableCell>
                  <TableCell>
                    <AppCopy>{participant.gender}</AppCopy>
                  </TableCell>
                  <TableCell>
                    <AppCopy>{participant.date_of_birth}</AppCopy>
                  </TableCell>
                  <TableCell>
                    <AppCopy>{participant.race}</AppCopy>
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
            className={classes.addParticipantLink}
            to="/participantInfo"
            onClick={() => {
              participantStore.setDefaultParticipant()
              participantStore.setDefaultVisit()
              participantStore.setServiceList([])
            }}
          >
            <AppHeading>Add Participant</AppHeading>
            <PersonAddIcon className={classes.addParticipantIcon} />
          </Link>
        </BottomNavigation>
      </div>
    </Fragment>
  )
})

export default ParticipantsList
