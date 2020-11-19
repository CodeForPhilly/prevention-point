import React, { useContext, useState, useEffect, useRef } from "react"
import { rootStoreContext } from "../stores/RootStore"
import PropTypes from "prop-types"
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
import PrevPointCopy from "./Typography/PrevPointCopy"
import { Formik, Form } from "formik"
import { SEPSearchSchema, SEPNeedleSchema } from "../validation"

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
  errorMessage: {
    marginTop: theme.spacing(1),
    color: "red",
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
  clearButton: {
    marginLeft: theme.spacing(1),
  },
}))

const SepForm = ({ sites, currentSite, setCurrentSite }) => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const [participantId, setParticipantId] = useState()
  const SEPFormRef = useRef()

  useEffect(() => {
    participantStore.getSites()
  }, [participantStore])

  const handleClear = () => {
    setParticipantId(null)
    if (SEPFormRef.current) {
      SEPFormRef.current.resetForm()
    }
  }

  return (
    <Container className={classes.root}>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={SEPFormRef}
        initialValues={{
          site_id: currentSite,
          sep_id: "",
          last_name: "",
          date_of_birth: "",
          maiden_name: "",
        }}
        validationSchema={SEPSearchSchema}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          await participantStore.getParticipants({
            sep_id: values.sep_id,
            last_name: values.last_name,
            dob: values.date_of_birth,
            maiden_name: values.maiden_name,
          })
          setSubmitting(false)
          if (participantStore.participants.length === 1) {
            setParticipantId(participantStore.participants[0].id)
            setFieldValue("sep_id", participantStore.participants[0].sep_id)
            setFieldValue(
              "last_name",
              participantStore.participants[0].last_name
            )
            setFieldValue(
              "date_of_birth",
              participantStore.participants[0].date_of_birth
            )
            setFieldValue(
              "maiden_name",
              participantStore.participants[0].maiden_name
            )
          }
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <FormControl
                  className={classes.siteId}
                  error={errors.site_id && touched.site_id}
                  disabled={participantId ? true : false}
                >
                  <InputLabel htmlFor="site_id">Site ID</InputLabel>
                  <Select
                    id="site_id"
                    name="site_id"
                    onChange={e => {
                      handleChange(e)
                      setCurrentSite(e.target.value)
                    }}
                    value={values.site_id}
                  >
                    {sites &&
                      sites.map((site, i) => (
                        <MenuItem key={i} value={site.id}>
                          {site.site_name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.site_id && (
                    <PrevPointCopy className={classes.errorMessage}>
                      {errors.site_id}
                    </PrevPointCopy>
                  )}
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
                  error={errors.maiden_name && touched.maiden_name}
                  disabled={participantId ? true : false}
                >
                  <InputLabel htmlFor="maiden_name">
                    Mother&apos;s Maiden Name
                  </InputLabel>
                  <PrevPointInput
                    id="maiden_name"
                    name="maiden_name"
                    onChange={handleChange}
                    value={values.maiden_name}
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
                {(errors.sep_id ||
                  errors.last_name ||
                  errors.date_of_birth ||
                  errors.maiden_name) && (
                  <PrevPointCopy className={classes.errorMessage}>
                    {errors.sep_id ||
                      errors.last_name ||
                      errors.date_of_birth ||
                      errors.maiden_name}
                  </PrevPointCopy>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          needles_in: "",
          needles_out: "",
          visit_date: new Date().toISOString().substring(0, 10),
        }}
        validationSchema={SEPNeedleSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await participantStore.createSEP({
            needles_in: values.needles_in,
            needles_out: values.needles_out,
            site: currentSite,
            participant: participantId,
            urgency: 1,
            program: 10,
            service: 44,
          })
          setSubmitting(false)
        }}
      >
        {({ errors, touched, values, handleChange, isSubmitting }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl
                      error={errors.needles_in && touched.needles_in}
                      disabled={participantId ? false : true}
                    >
                      <InputLabel htmlFor="needles_in">Needles In</InputLabel>
                      <Select
                        id="needles_in"
                        name="needles_in"
                        onChange={handleChange}
                        value={values.needles_in}
                      >
                        {[...Array(20)].map((x, i) => (
                          <MenuItem key={i + 1} value={i + 1}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      error={errors.needles_out && touched.needles_out}
                      disabled={participantId ? false : true}
                    >
                      <InputLabel htmlFor="needles_out">Needles Out</InputLabel>
                      <Select
                        id="needles_out"
                        name="needles_out"
                        onChange={handleChange}
                        value={values.needles_out}
                      >
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
                <FormControl
                  error={errors.visit_date && touched.visit_date}
                  disabled={participantId ? false : true}
                >
                  <InputLabel shrink htmlFor="visit_date">
                    Visit Date
                  </InputLabel>
                  <PrevPointInput
                    id="visit_date"
                    name="visit_date"
                    type="date"
                    onChange={handleChange}
                    value={values.visit_date}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <PrevPointButton
                  type="submit"
                  disabled={isSubmitting || participantId ? false : true}
                >
                  Submit
                </PrevPointButton>
                <PrevPointButton
                  type="button"
                  className={classes.clearButton}
                  disabled={participantId ? false : true}
                  onClick={handleClear}
                >
                  Clear
                </PrevPointButton>
                {(errors.needles_in ||
                  errors.needles_out ||
                  errors.visit_date) && (
                  <PrevPointCopy className={classes.errorMessage}>
                    {errors.needles_in ||
                      errors.needles_out ||
                      errors.visit_date}
                  </PrevPointCopy>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
SepForm.propTypes = {
  currentSite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sites: PropTypes.array,
  setCurrentSite: PropTypes.func,
}

export default SepForm
