import React, { useState } from "react"
import PropTypes from "prop-types"
import AllQueues from "../components/AllQueues"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"

let id = 0
function createData(urgency, uid, last, first, timeElapsed, seen, called) {
  id += 1
  return { id, urgency, uid, last, first, timeElapsed, called, seen }
}

//TODO: remove mockup data
const queueData = [
  {
    id: "case_management",
    name: "Case Management",
    waitTime: "10 minutes",
    rows: [
      createData(1, "FL159", "Last", "First", "4.0 min", true, false),
      createData(1, "FL237", "Last", "First", "4.3 min", false, false),
    ],
  },
  {
    id: "legal_services",
    name: "Legal Services",
    waitTime: "5 minutes",
    rows: [
      createData(1, "FL262", "Last", "First", "6.0 min", false, false),
      createData(1, "FL305", "Last", "First", "4.3 min", false, false),
      createData(3, "FL356", "Last", "First", "3.9 min", false, false),
    ],
  },
  {
    id: "step",
    name: "Step",
    waitTime: "7 minutes",
    rows: [
      createData(1, "FL159", "Last", "First", "4.0 min", false, false),
      createData(1, "FL237", "Last", "First", "4.3 min", false, false),
      createData(3, "FL262", "Last", "First", "6.0 min", true, false),
      createData(1, "FL305", "Last", "First", "4.3 min", false, false),
      createData(5, "FL356", "Last", "First", "3.9 min", true, false),
    ],
  },
]

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: "flex",
  },
  searchButton: {
    marginRight: 20,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  drawer: {
    width: drawerWidth,
  },
})

function ParticipantQueue({ classes }) {
  const [setDrawerOpen] = useState(false)
  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }
  return (
    <div>
      <Grid
        container
        style={{ justifyContent: "space-around" }}
        className="participant-dashboard"
        spacing={16}
      >
        <Grid item md>
          <Paper>
            <IconButton
              onClick={toggleDrawer(true)}
              className={classes.searchButton}
            >
              <SearchIcon />
              <Typography>Participant Search</Typography>
            </IconButton>
            <AllQueues queueData={queueData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

ParticipantQueue.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles, { withTheme: true })(ParticipantQueue)
