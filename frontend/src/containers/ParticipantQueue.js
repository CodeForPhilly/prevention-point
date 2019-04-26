import React from "react"
import AllQueues from "../components/AllQueues"
import ParticipantSearch from "../components/ParticipantSearch"
import { Grid, Paper, IconButton, Typography } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

let id = 0
function createData(urgent, uid, last, first, timeElapsed) {
  id += 1
  return { id, urgent, uid, last, first, timeElapsed }
}

const queueData = [
  {
    id: "case_management",
    name: "Case Management",
    waitTime: "10 minutes",
    rows: [
      createData("Yes", "FL159", "Last", "First", "4.0 min"),
      createData("No", "FL237", "Last", "First", "4.3 min"),
    ],
  },
  {
    id: "legal_services",
    name: "Legal Services",
    waitTime: "5 minutes",
    rows: [
      createData("Yes", "FL262", "Last", "First", "6.0 min"),
      createData("No", "FL305", "Last", "First", "4.3 min"),
      createData("Yes", "FL356", "Last", "First", "3.9 min"),
    ],
  },
  {
    id: "step",
    name: "Step",
    waitTime: "7 minutes",
    rows: [
      createData("Yes", "FL159", "Last", "First", "4.0 min"),
      createData("No", "FL237", "Last", "First", "4.3 min"),
      createData("Yes", "FL262", "Last", "First", "6.0 min"),
      createData("No", "FL305", "Last", "First", "4.3 min"),
      createData("Yes", "FL356", "Last", "First", "3.9 min"),
    ],
  },
]

function ParticipantQueue() {
  return (
    <div>
      <Grid
        container
        style={{ justifyContent: "space-around" }}
        className="participant-dashboard"
        spacing={16}
      >
        <Grid item xs={1}>
          <Paper>
            <IconButton>
              <SearchIcon />
              <Typography>Participant Search</Typography>
            </IconButton>
            <ParticipantSearch />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper>
            <AllQueues queueData={queueData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ParticipantQueue
