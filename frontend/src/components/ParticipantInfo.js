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
// import { toJS } from "mobx"

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

  const [open, setOpen] = React.useState("")
  const [id, setId] = React.useState(0)
  const [lastFourSSN, setSSN] = React.useState(0)
  const [startDate, setStartDate] = React.useState("")
  const [insurer, setInsurer] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [dateOfBirth, setDateOfBirth] = React.useState("")
  const [ppId, setPPId] = React.useState("")
  const [race, setRace] = React.useState("")
  const [gender, setGender] = React.useState("")
  const [hasInsurance, setHasInsurance] = React.useState(false)
  const [insuranceType, setInsuranceType] = React.useState("")
  const [program, setProgram] = React.useState("")
  const [service, setService] = React.useState("")
  const [priority, setPriority] = React.useState("")
  const [note, setNote] = React.useState("")
  const history = useHistory()

  let participant = participantStore.getParticipant()
  let data = participantStore.getParticipantsList()
  let participantIndex = data.findIndex(val => val.pp_id === participant.pp_id)
  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    if (participantIndex > -1) {
      // eslint-disable-next-line no-console
      // console.log(this.props.participantData)
      // assign incoming participant data if available
      setId(data[participantIndex].id)
      setSSN(data[participantIndex].last_four_ssn)
      setStartDate(data[participantIndex].start_date)
      setInsurer(data[participantIndex].insurer)
      setFirstName(data[participantIndex].first_name)
      setLastName(data[participantIndex].last_name)
      setDateOfBirth(data[participantIndex].date_of_birth)
      setPPId(data[participantIndex].pp_id)
      setRace(data[participantIndex].race)
      setGender(data[participantIndex].gender)
      setHasInsurance(data[participantIndex].is_insured)
      // setInsuranceType(data.insuranceType)
      // setProgram(data.program)
      // setService(data.service)
      // setPriority(data.priority)
      // setNote(data.note)
    }
  }, [])

  const handleFNameChange = e => setFirstName(e.target.value)
  const handleLNameChange = e => setLastName(e.target.value)
  const handleDOBChange = e => setDateOfBirth(e.target.value)
  const handleUUIDChange = e => {
    setPPId(e.target.value)
    setSSN(e.target.value.slice(-4))
  }
  const handleRaceChange = e => setRace(e.target.value)
  const handleGenderChange = e => setGender(e.target.value)
  const handleHasInsuranceChange = e => setHasInsurance(e.target.value)
  const handleInsuranceTypeChange = e => setInsuranceType(e.target.value)
  const handleProgramChange = e => setProgram(e.target.value)
  const handleServiceChange = e => setService(e.target.value)
  const handlePriorityLevelChange = e => setPriority(e.target.value)
  const handleNoteChange = e => setNote(e.target.value)

  const createStartDate = () => {
    var now = new Date()
    var y = now.getFullYear()
    var m = now.getMonth() + 1
    var d = now.getDate()
    return (
      "" + y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d
    )
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
    if (participantIndex > -1) {
      participantStore.setParticipant({
        id: id,
        first_name: firstName,
        last_name: lastName,
        last_four_ssn: lastFourSSN,
        date_of_birth: dateOfBirth,
        start_date: startDate,
        pp_id: ppId,
        race: race,
        gender: gender,
        is_insured: hasInsurance,
        insuranceType: insuranceType,
        insurer: insurer,
        program: program,
        service: service,
        priority: priority,
        note: note,
      })
      participantStore.updateParticipant()
      // if no match occurs then create new Participant
    } else {
      participantStore.setParticipant({
        first_name: firstName,
        last_name: lastName,
        last_four_ssn: lastFourSSN,
        date_of_birth: dateOfBirth,
        start_date: createStartDate(),
        pp_id: ppId,
        race: race,
        gender: gender,
        is_insured: hasInsurance,
        insuranceType: insuranceType,
        program: program,
        service: service,
        priority: priority,
        note: note,
      })
      participantStore.createParticipant()
    }
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
                      value={firstName}
                      onChange={handleFNameChange}
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
                      value={lastName}
                      onChange={handleLNameChange}
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
                      value={dateOfBirth}
                      onChange={handleDOBChange}
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
                      value={ppId}
                      onChange={handleUUIDChange}
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
                        value={race}
                        onChange={handleRaceChange}
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
                        value={gender}
                        onChange={handleGenderChange}
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
                        value={hasInsurance}
                        onChange={handleHasInsuranceChange}
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
                        value={insuranceType}
                        onChange={handleInsuranceTypeChange}
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
                      value={program}
                      onChange={handleProgramChange}
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
                      value={service}
                      onChange={handleServiceChange}
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
                      value={priority}
                      onChange={handlePriorityLevelChange}
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
                  onChange={handleNoteChange}
                  value={note}
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
