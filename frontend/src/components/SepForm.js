import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import PrevPointInput from "./Input/PrevPointInput"
import PrevPointButton from "./PrevPointButton"
import PrevPointHeading from "./Typography/PrevPointHeading"
import { Formik, Form } from "formik"
import { SEPSearchSchema } from "../validation"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: "20px",
  },
  form: {
    margin: "0 auto",
    maxWidth: "270px",
  },
  heading: {
    padding: "2px 0",
    color: "#086375",
  },
  siteId: {
    marginTop: "0",
    marginBottom: theme.spacing(4),
  },
  needlesIn: {
    paddingRight: theme.spacing(1),
  },
  needlesOut: {
    paddingLeft: theme.spacing(1),
  },
}))

const SepForm = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const [participantId, setParticipantId] = useState()

  return (
    <Container className={classes.root}>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          site_id: participantStore.getSite,
          sep_id: "",
          last_name: "",
          date_of_birth: "",
          mothers_last_name: "",
        }}
        validationSchema={SEPSearchSchema}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          await participantStore.getParticipants({
            //site_id: values.site_id,
            sep_id: values.sep_id,
            last_name: values.last_name,
            date_of_birth: values.date_of_birth,
            //mothers_last_name: values.mothers_last_name,
          })
          setSubmitting(false)
          if (participantStore.participants.length === 1) {
            setParticipantId(participantStore.participants[0].pp_id)
            setFieldValue(
              "date_of_birth",
              participantStore.participants[0].date_of_birth
            )
            setFieldValue("sep_id", participantStore.participants[0].sep_id)
          }
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={classes.siteId}>
                  <InputLabel htmlFor="site_id">Site ID</InputLabel>
                  <PrevPointInput
                    id="site_id"
                    name="site_id"
                    readOnly
                    value={values.site_id}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PrevPointHeading className={classes.heading}>
                  SEP Search
                </PrevPointHeading>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.sep_id && touched.sep_id}
                  disabled={participantId ? true : false}
                >
                  <InputLabel htmlFor="sep_id">SEP ID</InputLabel>
                  <PrevPointInput
                    id="sep_id"
                    name="sep_id"
                    onChange={handleChange}
                    value={values.sep_id}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.last_name && touched.last_name}
                  disabled={participantId ? true : false}
                >
                  <InputLabel htmlFor="last_name">
                    Participant&apos;s Last Name
                  </InputLabel>
                  <PrevPointInput
                    id="last_name"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.date_of_birth && touched.date_of_birth}
                  disabled={participantId ? true : false}
                >
                  <InputLabel shrink htmlFor="date_of_birth">
                    Date of Birth
                  </InputLabel>
                  <PrevPointInput
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    onChange={handleChange}
                    value={values.date_of_birth}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.mothers_last_name && touched.mothers_last_name}
                  disabled={participantId ? true : false}
                >
                  <InputLabel htmlFor="mothers_last_name">
                    Mother&apos;s Last Name
                  </InputLabel>
                  <PrevPointInput
                    id="mothers_last_name"
                    name="mothers_last_name"
                    onChange={handleChange}
                    value={values.mothers_last_name}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PrevPointButton
                  type="submit"
                  disabled={(participantId ? true : false) || isSubmitting}
                >
                  Search
                </PrevPointButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Formik className={classes.form}>
        <Form>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl disabled={participantId ? false : true}>
                    <InputLabel>Needles In</InputLabel>
                    <Select name="needles_in" value="">
                      {[...Array(20)].map((x, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl disabled={participantId ? false : true}>
                    <InputLabel>Needles Out</InputLabel>
                    <Select name="needles_out" value="">
                      {[...Array(20)].map((x, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl disabled={participantId ? false : true}>
                <InputLabel htmlFor="visit_date">
                  Visit Date (mm/dd/yyyy)
                </InputLabel>
                <PrevPointInput id="visit_date" name="visit_date" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <PrevPointButton
                type="button"
                disabled={participantId ? false : true}
              >
                Submit
              </PrevPointButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
})

export default SepForm
