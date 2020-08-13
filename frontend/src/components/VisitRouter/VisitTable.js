/*
a table that shows a row with each visit on it goes here
it will only show the db visit table info ,
(SELECT * FROM VISITS WHERE partipant_id = id;)
the route being
'api/participants/:participant_id/visits/'
*/
import React from "react"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PrevPointCopy } from "../Typography"
import PrevPointButton from "../PrevPointButton"

const VisitTable = (/** current participants visits*/) => {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <PrevPointCopy>
            A table listing all the visits for a participant
          </PrevPointCopy>
          <PrevPointButton component={Link} to="/existingParticipant/visitData">
            See a visit
          </PrevPointButton>
        </Grid>
      </Grid>
    </Container>
  )
}

export default VisitTable
