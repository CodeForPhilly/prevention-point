import React from "react"
import AllQueues from "../components/AllQueues"
import ParticipantSearch from "../components/ParticipantSearch"
import { Grid, Paper } from "@material-ui/core"

let id = 0
function createData(urgent, uid, last, first, timeElapsed) {
  id += 1
  return { id, urgent, uid, last, first, timeElapsed }
}

const rows = [
  createData("Yes", "FL159", "Last", "First", "4.0 min"),
  createData("No", "FL237", "Last", "First", "4.3 min"),
  createData("Yes", "FL262", "Last", "First", "6.0 min"),
  createData("No", "FL305", "Last", "First", "4.3 min"),
  createData("Yes", "FL356", "Last", "First", "3.9 min"),
]

const queueData = [
  {
    id: 1,
    name: "Case Management",
    waitTime: "10 minutes",
    rows,
  },
  {
    id: 2,
    name: "Legal Services",
    waitTime: "5 minutes",
    rows,
  },
  {
    id: 3,
    name: "Step",
    waitTime: "7 minutes",
    rows,
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
        <Grid item xs={3}>
          <Paper>
            <ParticipantSearch />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <AllQueues queueData={queueData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ParticipantQueue
