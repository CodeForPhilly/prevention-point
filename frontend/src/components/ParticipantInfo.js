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

const ParticipantSearch = () => {
  return (
    <div className="participant-search">
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
          <Grid container direction="row" justify="left" alignItems="left">
            <FormGroup className="participant-info">
              <Grid container spacing={6}>
                <Grid item xs>
                  <FormControl>
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
                  <FormControl>
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
            <FormGroup className="participant-info" style={{ marginTop: 11 }}>
              <Grid container spacing={6}>
                <Grid item xs>
                  <FormControl>
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
                  <FormControl style={{ marginTop: 24 }}>
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

            <FormGroup className="participant-info">
              <Grid container spacing={6}>
                <Grid item xs>
                  <FormControl>
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
                  <FormControl>
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
          </Grid>
          <Button type="submit" variant="contained" style={{ marginTop: 30 }}>
            Submit
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default ParticipantSearch
