import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(() => ({
  loadingWrapper: {
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "0px",
    bottom: "0px",
    backgroundColor: "gray",
    opacity: "0.3",
    zIndex: 9999,
  },
  spinner: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
}))

const LoadingScreen = () => {
  const classes = useStyles()
  return (
    <div className={classes.loadingWrapper}>
      <CircularProgress className={classes.spinner} />
    </div>
  )
}

export default LoadingScreen
