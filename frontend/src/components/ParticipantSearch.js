import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import PrevPointInput from "./Input/PrevPointInput"
import PrevPointButton from "./PrevPointButton"
import PrevPointCopy from "./Typography/PrevPointCopy"
import { rootStoreContext } from "../stores/RootStore"
import PrevPointHeading from "./Typography/PrevPointHeading"
import { Formik, Form } from "formik"
import * as Yup from "yup"

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
})

const ParticipantSearch = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const history = useHistory()

  const errorMessage = "Please enter a participant id or a name"
  const validationSchema = Yup.object().shape(
    {
      pp_id: Yup.string().when(["first_name", "last_name"], {
        is: (firstName, lastName) => !firstName && !lastName,
        then: Yup.string().required(errorMessage),
      }),
      first_name: Yup.string().when(["pp_id", "last_name"], {
        is: (ppId, lastName) => !ppId && !lastName,
        then: Yup.string().required(errorMessage),
      }),
      last_name: Yup.string().when(["pp_id", "first_name"], {
        is: (ppId, firstName) => !ppId && !firstName,
        then: Yup.string().required(errorMessage),
      }),
    },
    [
      ["pp_id", "first_name"],
      ["pp_id", "last_name"],
      ["first_name", "last_name"],
    ]
  )

  return (
    <Container className={classes.root}>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          pp_id: participantStore.params.pp_id
            ? participantStore.params.pp_id
            : "",
          first_name: participantStore.params.firstName
            ? participantStore.params.firstName
            : "",
          last_name: participantStore.params.lastName
            ? participantStore.params.lastName
            : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          participantStore.setParticipantIdParam(values.pp_id)
          participantStore.setParticipantFirstNameParam(values.first_name)
          participantStore.setParticipantLastNameParam(values.last_name)
          participantStore.getParticipants()
          history.push("/participants")
          setSubmitting(false)
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
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
                <InputLabel htmlFor="participant_id">Participant ID</InputLabel>
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
              <PrevPointButton type="submit" disabled={isSubmitting}>
                Submit
              </PrevPointButton>
              {(errors.pp_id || errors.first_name || errors.last_name) && (
                <PrevPointCopy className={classes.errorMessage}>
                  {errors.pp_id || errors.first_name || errors.last_name}
                </PrevPointCopy>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
})

export default ParticipantSearch
