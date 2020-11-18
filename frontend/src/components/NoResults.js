import React from "react"
import { Grid } from "@material-ui/core"
import PrevPointHeading from "./Typography/PrevPointHeading"
import PrevPointCopy from "./Typography/PrevPointCopy"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

import PrevPointButton from "./PrevPointButton"

const useStyles = makeStyles(() => ({
  noResultsColumn: {
    display: "flex",
    justifyContent: "center",
  },
  noResultsLockup: {
    paddingTop: 50,
  },
}))
const NoResults = ({ heading, subheading, action, label }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12} className={classes.noResultsColumn}>
        <div className={classes.noResultsLockup}>
          <PrevPointHeading>{heading}</PrevPointHeading>
          {subheading ? <PrevPointCopy>{subheading}</PrevPointCopy> : null}
          <PrevPointButton
            data-testid="no-results-button"
            onClick={() => {
              action()
            }}
          >
            {label ? label : "Click here"}
          </PrevPointButton>
        </div>
      </Grid>
    </Grid>
  )
}

NoResults.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  label: PropTypes.string,
  action: PropTypes.func,
}

export default NoResults
