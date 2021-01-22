/*

This will be a single visit display route.
here you can see all the data from the visit and
fill out forms. this will have user based permissions on
the backend ( for third party health providers )

This component should be thought of as hard coded and temporary.
ideally it will  be able to handle variating datasets

*/

import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PrevPointCopy, PrevPointHeading } from "../Typography"
import { makeStyles } from "@material-ui/core"
import { useHistory, useParams } from "react-router-dom"
import { PropTypes } from "prop-types"

const VisitData = ({ visitData }) => {
  const useStyles = makeStyles({
    tempPadding: {
      paddingTop: 10,
      paddingBottom: 100,
    },
  })

  const classes = useStyles()
  const history = useHistory()
  const { participantId } = useParams()

  useEffect(() => {
    // this is send the user back to existingParticipantView with the visit table.
    // this protects VisitData from attempting to load sensitive data just after login or refresh

    if (!visitData || !visitData.id) {
      history.push(`/participants/${participantId}/visits`)
    }
  })

  if (!visitData || !visitData.id) {
    return null
  }

  // todo fix markup
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <br />
          <br />
          <PrevPointHeading>Visit Data</PrevPointHeading>
          <hr />
          <div className={classes.tempPadding}>
            <PrevPointCopy>
              Visit Date:{" "}
              {new Date(visitData.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC", //the the database's Datefield is not timezone aware, so without the localestring assumes UTC. this was causing an off by one error
              })}
            </PrevPointCopy>
            <PrevPointCopy>
              Exchange site: {visitData.site.site_name}
            </PrevPointCopy>
            <PrevPointCopy>Needles in: {visitData.needles_in}</PrevPointCopy>
            <PrevPointCopy>Needles out: {visitData.needles_out}</PrevPointCopy>
            <PrevPointCopy>
              Needles exchanged: {visitData.needles_exchanged}
            </PrevPointCopy>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

VisitData.propTypes = {
  visitData: PropTypes.object,
}

export default VisitData
