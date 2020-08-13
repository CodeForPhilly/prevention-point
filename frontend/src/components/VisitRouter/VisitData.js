import React from "react"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PrevPointCopy } from "../Typography"

export default function VisitData() {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <PrevPointCopy>
            secret visit data and/or a form would go here
          </PrevPointCopy>
          {/*
            This will be a single visit display route.
            here you can see all the data from the visit and
            fill out forms. this will have user based permissions on
            the backend ( for third party health providers )



            the api route would be
            'api/visit/:visit_id/populated/'

            the front end route may also benefit from id based path
            thus being '/existingParticipant/:participant_id/visits/:visit_id/'

            This Component is not very well defined yet, and could be come to different routes, such as:
            '/existingParticipant/:participant_id/visits/:visit_id/forms'
            '/existingParticipant/:participant_id/visits/:visit_id/data'
            */}
        </Grid>
      </Grid>
    </Container>
  )
}
