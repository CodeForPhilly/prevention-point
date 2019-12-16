import React, { useContext, useEffect } from "react"
import { rootStoreContext } from "../stores/RootStore"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
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
import { format } from "date-fns"

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
  const participantStore = rootStore.ParticipantStore
  const [participant, setParticipant] = React.useState({})
  const [open, setOpen] = React.useState("")
  const history = useHistory()

  let currentParticipant = participantStore.getParticipant()
  let data = participantStore.getParticipantsList()
  let participantIndex = data.findIndex(
    val => val.pp_id === currentParticipant.pp_id
  )
  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    if (participantIndex > -1) {
      // assign incoming participant data if available
      setParticipant({
        id: data[participantIndex].id,
        firstName: data[participantIndex].first_name,
        lastName: data[participantIndex].last_name,
        lastFourSSN: data[participantIndex].last_four_ssn,
        dateOfBirth: data[participantIndex].date_of_birth,
        startDate: data[participantIndex].start_date,
        ppId: data[participantIndex].pp_id,
        race: data[participantIndex].race,
        gender: data[participantIndex].gender,
        hasInsurance: data[participantIndex].is_insured,
        insuranceType: data[participantIndex],
        insurer: data[participantIndex].insurer,
        program: data[participantIndex].program,
        service: data[participantIndex].service,
        priority: data[participantIndex].priority,
        note: data[participantIndex].note,
      })
    }
  }, [])

  const createStartDate = () => {
    return format(new Date(), "yyyy-MM-dd")
  }
  const changeParticipant = (e, args) => {
    setParticipant(prevState => ({
      ...prevState,
      [args]: e.target.value,
    }))
  }
  // set store stuff here and update Mobx on submit
  function handleClose() {
    setOpen(false)
  }
  function handleOpen() {
    setOpen(true)
  }
  function handleSubmit(e) {
    e.preventDefault()
    // match participant ID
    participantStore.setParticipant({
      id: participantIndex > -1 ? participant.id : null,
      first_name: participant.firstName,
      last_name: participant.lastName,
      last_four_ssn: participant.lastFourSSN,
      date_of_birth: participant.dateOfBirth,
      start_date:
        participantIndex > -1 ? participant.startDate : createStartDate(),
      pp_id: participant.ppId,
      race: participant.race,
      gender: participant.gender,
      is_insured: participant.hasInsurance,
      insuranceType: participant.insuranceType,
      insurer: participant.insurer,
      program: participant.program,
      service: participant.service,
      priority: participant.priority,
      note: participant.note,
    })
    participantIndex > -1
      ? participantStore.updateParticipant()
      : participantStore.createParticipant()
    history.push("/")
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

        <form className="participant-info-form" onSubmit={handleSubmit}>
          <Grid container>
            <FormGroup className="participant-info">
              <Grid container>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">First name</InputLabel>
                    <Input
                      id="user_first-name"
                      name="user_first-name"
                      value={participant.firstName}
                      onChange={e => changeParticipant(e, "firstName")}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">Last name</InputLabel>
                    <Input
                      id="user_last-name"
                      name="user_last-name"
                      value={participant.lastName}
                      onChange={e => changeParticipant(e, "lastName")}
                      required
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
                      value={participant.dateOfBirth}
                      onChange={e => changeParticipant(e, "dateOfBirth")}
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
                    <Input
                      id="uuid"
                      name="uuid"
                      value={participant.ppId}
                      onChange={e => changeParticipant(e, "ppId")}
                      required
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
                        open={open.race}
                        onClose={handleClose.race}
                        onOpen={handleOpen.race}
                        required
                        value={participant.race}
                        onChange={e => changeParticipant(e, "race")}
                        inputProps={{
                          name: "race",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        {/* <MenuItem value={"American Indian or Alaska Native"}>
                          American Indian or Alaska Native
                        </MenuItem> */}
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
                        open={open.gender}
                        onClose={handleClose.gender}
                        onOpen={handleOpen.gender}
                        required
                        value={participant.gender}
                        onChange={e => changeParticipant(e, "gender")}
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
                        value={participant.hasInsurance}
                        onChange={e => changeParticipant(e, "hasInsurance")}
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
                        open={open.insuranceType}
                        onClose={handleClose.insuranceType}
                        onOpen={handleOpen.insuranceType}
                        value={participant.insuranceType}
                        onChange={e => changeParticipant(e, "insuranceType")}
                        inputProps={{
                          name: "insuranceType",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Insurance Plan 1"}>
                          Insurance Plan 1
                        </MenuItem>
                        <MenuItem value={"Insurance Plan 2"}>
                          Insurance Plan 2
                        </MenuItem>
                        <MenuItem value={"Insurance Plan 3"}>
                          Insurance Plan 3
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
            </div>
          </Grid>
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
                      open={open.program}
                      onClose={handleClose.program}
                      onOpen={handleOpen.program}
                      required
                      value={participant.program}
                      onChange={e => changeParticipant(e, "program")}
                      inputProps={{
                        name: "program",
                        id: "demo-controlled-open-select",
                      }}
                    >
                      <MenuItem value={"Program 1"}>Program 1</MenuItem>
                      <MenuItem value={"Program 2"}>Program 2</MenuItem>
                      <MenuItem value={"Program 3"}>Program 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">
                      Select Service
                    </InputLabel>
                    <Select
                      open={open.service}
                      onClose={handleClose.service}
                      onOpen={handleOpen.service}
                      required
                      value={participant.service}
                      onChange={e => changeParticipant(e, "service")}
                      inputProps={{
                        name: "service",
                        id: "demo-controlled-open-select",
                      }}
                    >
                      <MenuItem value={"Service 1"}>Service 1</MenuItem>
                      <MenuItem value={"Service 2"}>Service 2</MenuItem>
                      <MenuItem value={"Service 3"}>Service 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <br />
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="demo-controlled-open-select">
                      Select Priority Level
                    </InputLabel>
                    <Select
                      open={open.priorityLevel}
                      onClose={handleClose.priorityLevel}
                      onOpen={handleOpen.priorityLevel}
                      value={participant.priority}
                      onChange={e => changeParticipant(e, "priority")}
                      inputProps={{
                        name: "priorityLevel",
                        id: "demo-controlled-open-select",
                      }}
                    >
                      <MenuItem value={"1"}>1 (Lowest)</MenuItem>
                      <MenuItem value={"2"}>2</MenuItem>
                      <MenuItem value={"3"}>3</MenuItem>
                      <MenuItem value={"4"}>4</MenuItem>
                      <MenuItem value={"5"}>5 (Highest)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <br />
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8, marginTop: 40 }}
                  placeholder="Add a note"
                  onChange={e => changeParticipant(e, "note")}
                  value={participant.note}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </FormGroup>
          </Grid>
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
