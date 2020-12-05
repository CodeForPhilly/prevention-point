/*
This will be a single visit display route.
here you can see all the data from the visit and
fill out forms. this will have user based permissions on
the backend ( for third party health providers )

right now, we only care about displaying the sepData, so this can become more
of a 'hard coded' display of data

if the project is improved, this view would become more complex
*/

import React from "react"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PrevPointCopy } from "../Typography"
import { makeStyles } from "@material-ui/core"

const VisitData = () => {
  const useStyles = makeStyles({
    tempPadding: {
      paddingTop: 100,
      paddingBottom: 100,
    },
  })

  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <PrevPointCopy className={classes.tempPadding}>
            Will display the information about one visit including the sep data.
            high permissions
          </PrevPointCopy>
        </Grid>
      </Grid>
    </Container>
  )
}

export default VisitData
