import React, { Fragment, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PrevPointCopy from "../components/Typography/PrevPointCopy"
import PrevPointHeading from "../components/Typography/PrevPointHeading"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointTable from "../components/ParticipantTableComponent/PrevPointTable"
import PrevPointPagination from "../components/ParticipantTableComponent/PrevPointPagination"
import { PARTICIPANT_LIST_TABLE_TITLES } from "../constants"
import { SEARCH, SEP } from "../constants"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import NoResults from "../components/NoResults"

const ParticipantList = observer(() => {
  const useStyles = makeStyles(theme => ({
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
      display: "inline-flex",
      alignItems: "center",
      padding: 20,
      color: "#086375",
    },
    addParticipantIcon: {
      marginLeft: 10,
    },
    participants: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    linkWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    bottomNavOffset: {
      height: "43px",
    },
    headingWrapper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    select: {
      marginLeft: theme.spacing(1),
    },
  }))
  const classes = useStyles()

  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const [participantTablePage, setParticipantTablePage] = useState(0)

  const handleParticipant = participant => {
    participantStore.setParticipant(participant)
    participantStore.setDefaultVisit()
  }

  return (
    <Fragment>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <PrevPointCopy>Search Results</PrevPointCopy>
      </Breadcrumbs>
      <Grid
        container
        spacing={1}
        alignItems="flex-end"
        className={classes.headingWrapper}
      >
        <Grid item>
          <PrevPointHeading className={classes.participantsListHeading}>
            Participants
          </PrevPointHeading>
        </Grid>
        <Grid item>
          <Select
            name="sidebarForm"
            value={participantStore.sidebarView}
            onChange={e => participantStore.setSidebarView(e.target.value)}
            className={classes.select}
          >
            <MenuItem value={SEARCH}>Participant Search</MenuItem>
            <MenuItem value={SEP}>SEP Search</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <div className={classes.participants}>
        <PrevPointPagination
          participants={participantStore.participants}
          page={participantTablePage}
          setPage={setParticipantTablePage}
        />
        {participantStore.participants.length ? (
          <PrevPointTable
            headerTitles={PARTICIPANT_LIST_TABLE_TITLES}
            participants={participantStore.participants.slice(
              50 * participantTablePage,
              50 * participantTablePage + 50
            )}
            handleClick={handleParticipant}
          />
        ) : (
          <NoResults
            heading="No participants found"
            subheading="Use the sidebar on the right to search"
            label="Open Sidebar"
            action={() => participantStore.handleDrawerOpen()}
          />
        )}
        <PrevPointPagination
          participants={participantStore.participants}
          page={participantTablePage}
          setPage={setParticipantTablePage}
        />
      </div>
      <div className={classes.bottomNavOffset}></div>
      <Grid
        container
        aria-label="Bottom Navigation"
        className={classes.addParticipantNav}
      >
        <Grid className={classes.linkWrapper} item xs={12}>
          <Link
            className={classes.addParticipantLink}
            to="/newParticipant"
            onClick={() => {
              participantStore.setDefaultParticipant()
              participantStore.setDefaultVisit()
              participantStore.setServiceList([])
            }}
          >
            <PrevPointHeading>Add Participant</PrevPointHeading>
            <PersonAddIcon className={classes.addParticipantIcon} />
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  )
})

export default ParticipantList
