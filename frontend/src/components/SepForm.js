import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import PrevPointHeading from "./Typography/PrevPointHeading"

const useStyles = makeStyles({
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
})

const SepForm = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container component="form" className={classes.form}>
        <PrevPointHeading className={classes.heading}>
          SEP Search
        </PrevPointHeading>
      </Grid>
    </Container>
  )
}

export default SepForm
