import React, { useState } from "react"
import PropTypes from "prop-types"
import AllQueues from "../components/AllQueues"
import ParticipantSearch from "../components/ParticipantSearch"
import {
  Grid,
  Paper,
  IconButton,
  Typography,
  Drawer,
  Hidden,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import SearchIcon from "@material-ui/icons/Search"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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
}))

const ParticipantQueue = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }
  return (
    <div>
      <Hidden smDown implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          className={classes.drawer}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <ParticipantSearch />
        </Drawer>
      </Hidden>
      <Grid
        container
        style={{ justifyContent: "space-around" }}
        className="participant-dashboard"
        spacing={9}
      >
        <Hidden mdDown>
          <Grid item md={3}>
            <ParticipantSearch />
          </Grid>
        </Hidden>
        <Grid item md>
          <Paper>
            <IconButton
              onClick={toggleDrawer(true)}
              className={classes.searchButton}
            >
              <SearchIcon />
              <Typography>Participant Search</Typography>
            </IconButton>
            <AllQueues />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

ParticipantQueue.propTypes = {
  classes: PropTypes.object,
}

export default ParticipantQueue
