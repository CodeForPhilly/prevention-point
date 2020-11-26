import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import PrevPointInput from "./Input/PrevPointInput"
import PrevPointButton from "./PrevPointButton"
import PrevPointCopy from "./Typography/PrevPointCopy"
import { RootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"
import { Formik, Form } from "formik"
import { searchSchema } from "../validation"
import { SEP } from "../constants"

const useStyles = makeStyles({
  root: {
    paddingTop: "20px",
    "& .error": {
      borderBottom: "1px solid red",
    },
  },
  form: {
    margin: "0 auto",
    maxWidth: "270px",
  },
  errorMessage: {
    color: "red",
  },
  heading: {
    padding: "2px 0",
    color: "#086375",
  },
  copy: {
    paddingTop: "20px",
  },
  toggle: {
    marginTop: "20px",
  },
  toggleLabel: {
    fontSize: ".875rem",
  },
})

const ParticipantSearch = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(RootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const history = useHistory()
  const [toggleForm, setToggleForm] = useState(false)

  return (
    <Container className={classes.root}>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          pp_id: "",
          first_name: "",
          last_name: "",
        }}
        validationSchema={searchSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await participantStore.getParticipants({
            pp_id: values.pp_id,
            first_name: values.first_name,
            last_name: values.last_name,
          })
          history.push("/participants")
          setSubmitting(false)
          if (toggleForm) {
            participantStore.setSidebarView(SEP)
          }
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <PrevPointHeading className={classes.heading}>
                  Participant Search
                </PrevPointHeading>
                <PrevPointCopy className={classes.copy}>
                  <b>Reminder:</b> Search for participant profile prior to
                  creating a new profile
                </PrevPointCopy>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={errors.pp_id && touched.pp_id}>
                  <InputLabel htmlFor="participant_id">
                    Participant ID
                  </InputLabel>
                  <PrevPointInput
                    id="participant_id"
                    name="pp_id"
                    value={values.pp_id}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PrevPointHeading className={classes.heading}>
                  Or
                </PrevPointHeading>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={errors.first_name && touched.first_name}>
                  <InputLabel htmlFor="first_name">First Name</InputLabel>
                  <PrevPointInput
                    id="first_name"
                    name="first_name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={errors.last_name && touched.last_name}>
                  <InputLabel htmlFor="last_name">Last Name</InputLabel>
                  <PrevPointInput
                    id="last_name"
                    name="last_name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  classes={{ root: classes.toggle, label: classes.toggleLabel }}
                  control={
                    <Checkbox
                      checked={toggleForm}
                      onChange={() => setToggleForm(!toggleForm)}
                      name="SEPToggle"
                    />
                  }
                  label="toggle to SEP form on search"
                />
              </Grid>
              <Grid item xs={12}>
                <PrevPointButton type="submit" disabled={isSubmitting}>
                  Submit
                </PrevPointButton>
                {(errors.pp_id || errors.first_name || errors.last_name) && (
                  <PrevPointCopy className={classes.errorMessage}>
                    {errors.pp_id || errors.first_name || errors.last_name}
                  </PrevPointCopy>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
})

export default ParticipantSearch
