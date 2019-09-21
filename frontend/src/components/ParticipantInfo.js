import React from "react"
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

const useStyles = makeStyles(theme => ({
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

const ParticipantInfo = () => {
  const [open, setOpen] = React.useState(false)

  function handleClose() {
    setOpen(false)
  }

  function handleOpen() {
    setOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    fetch("/api/participants/", {
      method: "POST",
      body: data,
    })
  }

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    uuId: "",
    race: "",
    gender: "",
    hasInsurance: "",
    insuranceType: "",
    program: "",
    service: "",
    note: "",
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
    // console.log("...values: " + JSON.stringify(values))
    // console.log("event.target.value: " + event.target.value)
    // console.log(
    //   "Participant's name: " + values.firstName + " " + values.lastName
    // )
    // console.log("Birthdate: " + values.birthDate)
    // console.log("Race: " + values.race)
    // console.log("Gender: " + values.gender)
    // console.log("Has insurance?: " + values.hasInsurance)
    // console.log("Insurance type: " + values.insuranceType)
    // console.log("Program: " + values.program)
    // console.log("Service: " + values.service)
    // console.log("Participant note: " + values.note)
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
                      value={values.firstName}
                      onChange={handleChange("firstName")}
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
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </FormGroup>
            <br />
            <br />
            <FormGroup className="participant-info">
              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">Date of birth</InputLabel>
                    <TextField
                      id="user_birth-date"
                      name="user_birth-date"
                      value={values.birthDate}
                      onChange={handleChange("birthDate")}
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
                      value={values.uuId}
                      onChange={handleChange("uuId")}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
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
                        value={values.race}
                        onChange={handleChange("race")}
                        inputProps={{
                          name: "race",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"American Indian or Alaska Native"}>
                          American Indian or Alaska Native
                        </MenuItem>
                        <MenuItem value={"Asian"}>Asian</MenuItem>
                        <MenuItem value={"Black or African American"}>
                          Black or African American
                        </MenuItem>
                        <MenuItem value={"Hispanic or Latino"}>
                          Hispanic or Latino
                        </MenuItem>
                        <MenuItem
                          value={"Native Hawaiian or Other Pacific Islander"}
                        >
                          Native Hawaiian or Other Pacific Islander
                        </MenuItem>
                        <MenuItem value={"Two or More Races"}>
                          Two or More Races
                        </MenuItem>
                        <MenuItem value={"White or Caucasian"}>
                          White or Caucasian
                        </MenuItem>
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
                        value={values.gender}
                        onChange={handleChange("gender")}
                        inputProps={{
                          name: "gender",
                          id: "demo-controlled-open-select",
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Trans (M)"}>Trans (M)</MenuItem>
                        <MenuItem value={"Trans (F)"}>Trans (F)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
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
                        value={values.hasInsurance}
                        onChange={handleChange("hasInsurance")}
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
                        value={values.insuranceType}
                        onChange={handleChange("insuranceType")}
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
                      value={values.program}
                      onChange={handleChange("program")}
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
                      value={values.service}
                      onChange={handleChange("service")}
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
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8, marginTop: 40 }}
                  placeholder="Add a note"
                  onChange={handleChange("note")}
                  value={values.note}
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
            Submit
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ParticipantInfo
