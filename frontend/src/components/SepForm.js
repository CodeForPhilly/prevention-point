import React, { useContext, useState, useEffect, useRef } from "react"
import { RootStoreContext } from "../stores/RootStore"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
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
import { SNACKBAR_SEVERITY, SYRINGE_EXCHANGE_SLUG } from "../constants"

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
  needlesExchanged: {
    marginTop: "-12% !important",
  },
  clearButton: {
    marginLeft: theme.spacing(1),
  },
}))

const SepForm = ({
  sites,
  currentSite,
  setCurrentSite,
  SEPFormValues,
  clearSEPFormValues,
}) => {
  const classes = useStyles()
  const rootStore = useContext(RootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const utilityStore = rootStore.UtilityStore
  const [participantId, setParticipantId] = useState()
  const SEPParticipantFormRef = useRef()
  const SEPNeedleFormRef = useRef()
  const history = useHistory()

  const { participant_id, ...OtherSEPValues } = SEPFormValues

  useEffect(() => {
    return handleClear
  }, [])

  useEffect(() => {
    participantStore.getSites()
  }, [participantStore])

  useEffect(() => {
    utilityStore.getServiceBySlug(SYRINGE_EXCHANGE_SLUG)

    return function cleanup() {
      utilityStore.setServiceSlugResponse({})
    }
  }, [utilityStore])

  useEffect(() => {
    if (SEPParticipantFormRef.current) {
      SEPParticipantFormRef.current.resetForm({
        values: {
          ...SEPParticipantFormRef.current.initialValues,
          ...OtherSEPValues,
          site_id: SEPParticipantFormRef.current.values.site_id,
        },
      })
    }
    if (SEPNeedleFormRef.current) {
      SEPNeedleFormRef.current.resetForm()
    }

    setParticipantId(participant_id)
    // eslint-disable-next-line camelcase
  }, [OtherSEPValues, participant_id])

  const handleClear = () => {
    setParticipantId(null)
    clearSEPFormValues()
    if (SEPParticipantFormRef.current) {
      SEPParticipantFormRef.current.resetForm({
        values: {
          ...SEPParticipantFormRef.current.initialValues,
          site_id: SEPParticipantFormRef.current.values.site_id,
        },
      })
    }
    if (SEPNeedleFormRef.current) {
      SEPNeedleFormRef.current.resetForm()
    }
  }

  return (
    <Container className={classes.root}>
      <Formik
        className={classes.form}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={SEPParticipantFormRef}
        initialValues={{
          ...OtherSEPValues,
          site_id: currentSite,
        }}
        validationSchema={SEPSearchSchema}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          await participantStore.getParticipants({
            sep_id: values.sep_id.toLowerCase(),
            last_name: values.last_name,
            dob: values.date_of_birth,
            maiden_name: values.maiden_name,
          })
          history.push("/participants")
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
                  disabled={participantId && currentSite ? true : false}
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
                  disabled={participantId && currentSite ? true : false}
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
                  disabled={participantId && currentSite ? true : false}
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
                  disabled={participantId && currentSite ? true : false}
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
                  disabled={participantId && currentSite ? true : false}
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
                  disabled={
                    (participantId && currentSite ? true : false) ||
                    isSubmitting
                  }
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
        innerRef={SEPNeedleFormRef}
        initialValues={{
          needles_in: "",
          needles_out: "",
          exchanged_for: "",
          visit_date: new Date().toISOString().substring(0, 10),
        }}
        validationSchema={SEPNeedleSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await participantStore.createSEP({
            needles_in: values.needles_in,
            needles_out: values.needles_out,
            exchanged_for: values.exchanged_for,
            visit_date: values.visit_date,
            site: currentSite,
            participant: participantId,
            urgency: 1,
            program: utilityStore.serviceSlugResponse.program,
            service: utilityStore.serviceSlugResponse.id,
          })
          setSubmitting(false)
          if (success) {
            handleClear()
            utilityStore.setSnackbarState("SEP data submitted", {
              severity: SNACKBAR_SEVERITY.SUCCESS,
            })
          }
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
                      disabled={participantId && currentSite ? false : true}
                    >
                      <InputLabel htmlFor="needles_in">Needles In</InputLabel>
                      <PrevPointInput
                        id="needles_in"
                        name="needles_in"
                        onChange={handleChange}
                        value={values.needles_in}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      error={errors.needles_out && touched.needles_out}
                      disabled={participantId && currentSite ? false : true}
                    >
                      <InputLabel htmlFor="needles_out">Needles Out</InputLabel>
                      <PrevPointInput
                        id="needles_out"
                        name="needles_out"
                        onChange={handleChange}
                        value={values.needles_out}
                      />
                    </FormControl>
                  </Grid>
                  <Grid className={classes.needlesExchanged} item xs={12}>
                    <FormControl
                      error={errors.exchanged_for && touched.exchanged_for}
                      disabled={participantId && currentSite ? false : true}
                    >
                      <InputLabel htmlFor="exchanged_for">
                        Needles Exchanged For
                      </InputLabel>
                      <PrevPointInput
                        id="exchanged_for"
                        name="exchanged_for"
                        onChange={handleChange}
                        value={values.exchanged_for}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  error={errors.visit_date && touched.visit_date}
                  disabled={participantId && currentSite ? false : true}
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
                  disabled={
                    isSubmitting || (participantId && currentSite)
                      ? false
                      : true
                  }
                >
                  Submit
                </PrevPointButton>
                <PrevPointButton
                  type="button"
                  className={classes.clearButton}
                  disabled={participantId && currentSite ? false : true}
                  onClick={handleClear}
                >
                  Clear
                </PrevPointButton>
                {(errors.needles_in ||
                  errors.needles_out ||
                  errors.exchanged_for ||
                  errors.visit_date) && (
                  <PrevPointCopy className={classes.errorMessage}>
                    {errors.needles_in ||
                      errors.needles_out ||
                      errors.exchanged_for ||
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
  SEPFormValues: PropTypes.object,
  clearSEPFormValues: PropTypes.func,
}

export default SepForm
