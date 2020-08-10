import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import PrevPointHeading from "../components/Typography/PrevPointHeading"
import PrevPointTitle from "../components/Typography/PrevPointTitle"
import PrevPointButton from "../components/PrevPointButton"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
}))

const Error404Page = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <PrevPointHeading>404</PrevPointHeading>
      <PrevPointTitle>Page Not Found</PrevPointTitle>
      <PrevPointButton component={Link} to="/">
        Go to Queue Page
      </PrevPointButton>
    </Container>
  )
}

export default Error404Page
