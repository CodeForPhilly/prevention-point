import React from "react"
import "../scss/participant-search.scss"
import FormGroup from "@material-ui/core/FormGroup"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
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
  const [value, setValue] = React.useState("female")

  function handleChange(event) {
    setValue(event.target.value)
  }

  const classes = useStyles()
  return (
    <div className="participant-info-component">
      <Container maxWidth="sm">
        <Typography
          style={{ textAlign: "left" }}
          component="h5"
          variant="h5"
          gutterBottom
        >
          1. Participant Information
        </Typography>

        <form className="participant-info-form">
          <Grid container>
            <FormGroup className="participant-info">
              <Grid container>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="user_id">First name</InputLabel>
                    <Input
                      id="user_first-name"
                      name="user_first-name"
                      value=""
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
                      value=""
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
                      value=""
                      required
                      style={{ marginTop: 40 }}
                      type="date"
                      defaultValue=""
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
                      id="user_last-name"
                      name="user_last-name"
                      value=""
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
                      // open={open}
                      // onClose={handleClose}
                      // onOpen={handleOpen}
                      // value={age}
                      // onChange={handleChange}
                      // inputProps={{
                      //   name: "age",
                      //   id: "demo-controlled-open-select",
                      // }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Select Gender
                      </InputLabel>
                      <Select
                      // open={open}
                      // onClose={handleClose}
                      // onOpen={handleOpen}
                      // value={age}
                      // onChange={handleChange}
                      // inputProps={{
                      //   name: "age",
                      //   id: "demo-controlled-open-select",
                      // }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
            </div>

            <div className={classes.root}>
              <FormGroup className="participant-info" component="fieldset">
                <Grid container>
                  <Grid item xs>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Has Insurance?</FormLabel>
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        value={value}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="top"
                          control={<Radio color="primary" />}
                          label="Yes"
                          labelPlacement="top"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
            </div>

            <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  )
}

export default ParticipantInfo
