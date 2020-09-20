import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import PropTypes from "prop-types"

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navbarOffset: {
    ...theme.mixins.toolbar,
    "@media (max-width: 700px)": {
      minHeight: "116px",
    },
  },
}))

const PersistentDrawerLeft = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        drawerOpen={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Sidebar handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.navbarOffset} />
        {props.children}
      </main>
    </div>
  )
}

PersistentDrawerLeft.propTypes = {
  children: PropTypes.element.isRequired,
}

export default PersistentDrawerLeft
