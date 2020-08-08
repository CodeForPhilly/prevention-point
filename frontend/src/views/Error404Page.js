import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import PrevPointButton from "../components/PrevPointButton"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  h1: {
    fontWeight: "500",
  },
}))

const Error404Page = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Typography variant="h1" color="primary" className={classes.h1}>
        404
      </Typography>
      <Typography variant="h2" color="primary">
        Page Not Found
      </Typography>
      <PrevPointButton component={Link} to="/">
        Go to Queue Page
      </PrevPointButton>
    </Container>
  )
}

export default Error404Page
