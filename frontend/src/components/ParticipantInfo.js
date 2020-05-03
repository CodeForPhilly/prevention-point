// TODO:
/**
 * 1. Breakup into participant and visit child components
 * 2. Break fields into smaller individual components for re-use in other forms
 * 3. Break up state in MobX for field re-use
 */

/* eslint-disable indent */
import React, { useContext, useEffect } from "react"
import { rootStoreContext } from "../stores/RootStore"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Container from "@material-ui/core/Container"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Button from "@material-ui/core/Button"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import { autorun, toJS } from "mobx"
import PrevPointInput from "./PrevPointInput"

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    float: "right",
    width: "25%",
    marginRight: "35px",
  },
  hidden: {
    display: "none",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ParticipantInfo = observer(() => {
  const rootStore = useContext(rootStoreContext)
  // particiant store derived from root store
  const participantStore = rootStore.ParticipantStore
  // TODO: refactor after v1.0.0 release
  const queueStore = rootStore.QueueStore
  // set up history for routing pushes
  const history = useHistory()
  // get existing participant if applicable else its undefined
  const existingParticipant = toJS(participantStore.participant)
  // get existing visit if applicable else its undefined
  const existingVisit = toJS(participantStore.visit)
  const insurers = toJS(participantStore.insurers)
  let programList = toJS(participantStore.programs)
  const serviceList = toJS(participantStore.services)

  // TODO: refactor after v1.0.0 release
  if (existingParticipant.id && !existingVisit.id) {
    let filterThesePrograms = []
    queueStore.participantWithPrograms.forEach(currentparticipantprograms => {
      if (existingParticipant.id === currentparticipantprograms.id) {
        filterThesePrograms.push(toJS(currentparticipantprograms.programs.name))
      }
    })
    if (programList.length > 0) {
      programList = programList.filter(
        program =>
          program.name !==
          filterThesePrograms[filterThesePrograms.indexOf(program.name)]
      )
    }
  }
  // -----------------------------------

  useEffect(() => {
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // kick off api calls for program list from Mobx
    participantStore.getPrograms()
    // TODO: refactor after v1.0.0 release
    const queueSize = Object.keys(queueStore.queues).length
    for (let i = 1; i <= queueSize; i++) queueStore.getQueue(i)
    // -----------------------------------
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set store stuff here and update Mobx on submit
  const handleSubmit = e => {
    e.preventDefault()
    // if existing participant and vist we are coming from QueueTable, so update particiapnt and visit
    if (existingParticipant.id && existingVisit.id) {
      participantStore.updateParticipant()
      participantStore.updateVisit()
      // if existing participant and no vist we are coming from search, so update particiapnt only
    } else if (existingParticipant.id && !existingVisit.id) {
      participantStore.updateParticipant()
      participantStore.createVisit()
      // otherwise we are adding a new participant because both participant and visit will be undefined
    } else {
      participantStore.createParticipant()
    }
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/")
      }
    })
  }
  // set service listings based on chosen program
  const findAndSaveServiceListings = e => {
    const serviceListing = programList.find(
      program => program.id === e.target.value
    )
    participantStore.setServiceList(serviceListing.services)
  }

  const classes = useStyles()
  return (
    <div
      style={{ marginTop: 50, marginBottom: 50 }}
      className="participant-info-component"
    >
      <Container maxWidth="sm">
        <Typography
          style={{ textAlign: "left" }}
          component="h5"
          variant="h5"
          gutterBottom
        >
          1. Participant Information
        </Typography>

        <form className="participant-info-form" onSubmit={e => handleSubmit(e)}>
          <Grid container>
            <FormGroup className="participant-info">
              <Grid container>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">First name</InputLabel>
                    <PrevPointInput
                      id="user_first-name"
                      name="user_first-name"
                      val={existingParticipant.first_name}
                      changeFunc={participantStore.setFirstName}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">Last name</InputLabel>
                    <PrevPointInput
                      id="user_last-name"
                      name="user_last-name"
                      val={existingParticipant.last_name}
                      changeFunc={participantStore.setLastName}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup className="participant-info">
              <Grid container>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">Date of birth</InputLabel>
                    <TextField
                      id="user_birth-date"
                      name="user_birth-date"
                      value={existingParticipant.date_of_birth}
                      onChange={e =>
                        participantStore.setDateOfBirth(e.target.value)
                      }
                      required
                      style={{ marginTop: 40 }}
                      type="date"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs>
                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: 32 }}
                  >
                    <InputLabel htmlFor="user_id">UUID</InputLabel>
                    <PrevPointInput
                      id="uuid"
                      name="uuid"
                      val={existingParticipant.pp_id}
                      changeFunc={participantStore.setPPId}
                      changeFunc2={participantStore.setLastFourSSN}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
            </FormGroup>
            <div className={classes.root}>
              <FormGroup className="participant-info">
                <Grid container>
                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Race
                      </InputLabel>
                      <Select
                        required
                        value={existingParticipant.race}
                        onChange={e => participantStore.setRace(e.target.value)}
                        inputProps={{
                          name: "race",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value={"asian pi"}>Asian</MenuItem>
                        <MenuItem value={"black (african american)"}>
                          Black or African American
                        </MenuItem>
                        <MenuItem value={"latino"}>Hispanic or Latino</MenuItem>
                        <MenuItem value={"native american"}>
                          Native American
                        </MenuItem>
                        <MenuItem value={"white (caucasian)"}>
                          White or Caucasian
                        </MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Gender
                      </InputLabel>
                      <Select
                        required
                        value={existingParticipant.gender}
                        onChange={e =>
                          participantStore.setGender(e.target.value)
                        }
                        inputProps={{
                          name: "gender",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"mtf"}>Male to Female</MenuItem>
                        <MenuItem value={"ftm"}>Female to Male</MenuItem>
                        <MenuItem value={"gender queer"}>Gender Queer</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
              </FormGroup>
            </div>

            <div className={classes.root}>
              <FormGroup className="participant-info">
                <Grid container>
                  <Grid item xs>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Has Insurance?</FormLabel>
                      <RadioGroup
                        aria-label="insurance"
                        name="hasInsurance"
                        className={classes.group}
                        value={
                          existingParticipant.is_insured === true ? "yes" : "no"
                        }
                        onChange={e =>
                          participantStore.setIsInsured(
                            e.target.value === "yes" ? true : false
                          )
                        }
                        style={{ display: "inline" }}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Insurance
                      </InputLabel>
                      <Select
                        value={existingParticipant.insurer}
                        onChange={e =>
                          participantStore.setInsurer(e.target.value)
                        }
                        inputProps={{
                          name: "insuranceType",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        {insurers.map((company, index) => (
                          <MenuItem
                            key={index}
                            value={
                              insurers && insurers.length > 0 ? company.id : ""
                            }
                          >
                            {insurers && insurers.length > 0
                              ? company.name
                              : ""}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
            </div>
          </Grid>

          <div>
            <Typography
              style={{ textAlign: "left" }}
              component="h5"
              variant="h5"
              gutterBottom
            >
              <br />
              <br />
              2. Check In Participant
            </Typography>
            <Grid container>
              <FormGroup className="participant-info">
                <Grid container>
                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Choose Program
                      </InputLabel>
                      <Select
                        required
                        value={existingVisit.program}
                        onChange={e => {
                          participantStore.setVisitProgram(e.target.value)
                          findAndSaveServiceListings(e)
                        }}
                        inputProps={{
                          name: "program",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        {programList.map(program => (
                          <MenuItem
                            key={program.id}
                            value={
                              programList && programList.length > 0
                                ? program.id
                                : ""
                            }
                          >
                            {programList && programList.length > 0
                              ? program.name
                              : ""}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Service
                      </InputLabel>
                      {existingVisit.program && serviceList.length > 0 ? (
                        <Select
                          required
                          value={existingVisit.service}
                          onChange={e =>
                            participantStore.setVisitService(e.target.value)
                          }
                          inputProps={{
                            name: "service",
                            id: "demo-controlled-open-select",
                          }}
                        >
                          {serviceList.map(service => (
                            <MenuItem
                              key={service.id}
                              value={
                                serviceList && serviceList.length > 0
                                  ? service.id
                                  : ""
                              }
                            >
                              {serviceList && serviceList.length > 0
                                ? service.name
                                : ""}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <br />
                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Priority Level
                      </InputLabel>
                      <Select
                        value={existingVisit.urgency}
                        onChange={e =>
                          participantStore.setVisitUrgency(e.target.value)
                        }
                        inputProps={{
                          name: "priorityLevel",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value={"_1"}>1 (Lowest)</MenuItem>
                        <MenuItem value={"_2"}>2</MenuItem>
                        <MenuItem value={"_3"}>3</MenuItem>
                        <MenuItem value={"_4"}>4</MenuItem>
                        <MenuItem value={"_5"}>5 (Highest)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8, marginTop: 40 }}
                    placeholder="Add a note"
                    onChange={e =>
                      participantStore.setVisitNotes(e.target.value)
                    }
                    value={existingVisit.notes}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </FormGroup>
            </Grid>
          </div>

          <Button
            style={{
              alignSelf: "flex-end",
              marginTop: 20,
              float: "right",
              marginBottom: 100,
            }}
            variant="outlined"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Add to Queue
          </Button>
        </form>
      </Container>
    </div>
  )
})

export default ParticipantInfo
