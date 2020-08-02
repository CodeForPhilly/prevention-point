import React, { Fragment, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import SearchIcon from "@material-ui/icons/Search"
import PrevPointCopy from "../components/Typography/PrevPointCopy"
import PrevPointHeading from "../components/Typography/PrevPointHeading"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointTable from "../components/ParticipantTableComponent/PrevPointTable"
import { PARTICIPANT_LIST_TABLE_TITLES } from "../constants"
import Grid from "@material-ui/core/Grid"

const ParticipantList = observer(() => {
  const useStyles = makeStyles(theme => ({
    participantsListHeading: {
      marginBottom: theme.spacing(1),
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
    linkWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    autocompleteWrapper: {
      minHeight: theme.spacing(8),
    },
    searchIcon: {
      marginLeft: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
    autocompleteField: {
      width: "300px",
      marginTop: "0",
    },
  }))
  const classes = useStyles()

  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  let history = useHistory()

  useEffect(() => {
    ;(async () => {
      // kick off api calls for participants from Mobx
      await participantStore.getParticipants()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participantStore])

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
        className={classes.autocompleteWrapper}
      >
        <Grid item>
          <PrevPointHeading className={classes.participantsListHeading}>
            Participants
          </PrevPointHeading>
        </Grid>

        <Grid item>
          {participantStore.participants.length > 0 && (
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon className={classes.searchIcon} />
              </Grid>
              <Grid item>
                <Autocomplete
                  disableClearable
                  noOptionsText="No results found"
                  options={participantStore.participants}
                  getOptionLabel={participant => {
                    return participant.first_name + " " + participant.last_name
                  }}
                  onChange={(event, value, reason) => {
                    if (reason === "select-option") {
                      handleParticipant(value)
                      history.push("/participantInfo")
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Quick Search"
                      margin="normal"
                      className={classes.autocompleteField}
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <div className="participants">
        <PrevPointTable
          headerTitles={PARTICIPANT_LIST_TABLE_TITLES}
          participants={participantStore.participants}
          handleClick={handleParticipant}
        />
      </div>
      <Grid
        container
        aria-label="bottomNav"
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
