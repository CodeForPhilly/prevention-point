import React, { useContext } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import PropTypes from "prop-types"
import { observer } from "mobx-react-lite"
import { RootStoreContext } from "../stores/RootStore"

const drawerWidth = 300

const MainLayout = observer(props => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      position: "relative",
      zIndex: 0,
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

  const rootStore = useContext(RootStoreContext)
  const utilityStore = rootStore.UtilityStore

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        drawerOpen={utilityStore.isDrawerOpen}
        handleDrawerOpen={() => utilityStore.handleDrawerOpen()}
        handleDrawerClose={() => utilityStore.handleDrawerClose()}
        drawerWidth={drawerWidth}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={utilityStore.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Sidebar handleDrawerClose={() => utilityStore.handleDrawerClose()} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: utilityStore.isDrawerOpen,
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
