import React, { useState } from "react"
import AllQueues from "../components/AllQueues"
import ParticipantSearch from "../components/ParticipantSearch"
import { Grid, Paper, IconButton, Typography, Drawer } from "@material-ui/core"
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

function ParticipantQueue() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }
  return (
    <div>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ParticipantSearch />
        </div>
      </Drawer>
      <Grid
        container
        style={{ justifyContent: "space-around" }}
        className="participant-dashboard"
        spacing={16}
      >
        <Grid item xs={2}>
          <Paper>
            <IconButton onClick={toggleDrawer(true)}>
              <SearchIcon />
              <Typography>Participant Search</Typography>
            </IconButton>
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
