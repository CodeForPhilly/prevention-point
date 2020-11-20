import React, { useContext } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import PropTypes from "prop-types"
import { observer } from "mobx-react-lite"
import { rootStoreContext } from "../stores/RootStore"

const drawerWidth = 300

const MainLayout = observer(props => {
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

  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        drawerOpen={participantStore.isDrawerOpen}
        handleDrawerOpen={() => participantStore.handleDrawerOpen()}
        handleDrawerClose={() => participantStore.handleDrawerClose()}
        drawerWidth={drawerWidth}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={participantStore.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Sidebar
          handleDrawerClose={() => participantStore.handleDrawerClose()}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: participantStore.isDrawerOpen,
        })}
      >
        <div className={classes.navbarOffset} />
        {props.children}
      </main>
    </div>
  )
})

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default MainLayout
