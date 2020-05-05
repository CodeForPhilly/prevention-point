import React, { Fragment, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
// import TableRow from "@material-ui/core/TableRow"
// import TableBody from "@material-ui/core/TableBody"
// import TableCell from "@material-ui/core/TableCell"
// import TableHead from "@material-ui/core/TableHead"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import BottomNavigation from "@material-ui/core/BottomNavigation"

import PrevPointCopy from "../components/Typography/PrevPointCopy"
// import PrevPointTitle from "../components/Typography/PrevPointTitle"
import PrevPointHeading from "../components/Typography/PrevPointHeading"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointTableHead from "./../components/ParticipantsListComponent/PrevPointTableHead"
import PrevPointTableBody from "./../components/ParticipantsListComponent/PrevPointTableBody"
import { PARTICIPANT_LIST_TABLE_TITLES } from "./../constants/GlobalConstants"

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
          <PrevPointCopy>Search Results</PrevPointCopy>
        </Breadcrumbs>
        <PrevPointHeading className={classes.participantsListHeading}>
          Participants
        </PrevPointHeading>
        <div className="participants">
          <Table>
            <PrevPointTableHead headerTitles={PARTICIPANT_LIST_TABLE_TITLES} />
            <PrevPointTableBody
              participants={participantStore.participants}
              handleClick={handleParticipant}
            />
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
            <PrevPointHeading>Add Participant</PrevPointHeading>
            <PersonAddIcon className={classes.addParticipantIcon} />
          </Link>
        </BottomNavigation>
      </div>
    </Fragment>
  )
})

export default ParticipantsList
