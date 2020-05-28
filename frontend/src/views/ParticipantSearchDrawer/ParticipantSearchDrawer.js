import React from "react"
import clsx from "clsx"
import { useTheme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ParticipantSearch from "../../components/ParticipantSearch"
import PropTypes from "prop-types"
import { useStyles } from "./ParticipantSearchDrawerStyle"
import { withRouter } from "react-router-dom"
import Toolbar from "@material-ui/core/Toolbar"
import MenuIcon from "@material-ui/icons/Menu"
import Navbar from "../../components/Navbar"

const ParticipantSearchDrawer = props => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const handleDrawerToggle = () => setOpen(!open)

  const ToolbarWrapper = withRouter(({ history }) =>
    history.location.pathname.match(/login/) ? null : (
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Navbar />
      </Toolbar>
    )
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ToolbarWrapper handleToggle={handleDrawerToggle} />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ParticipantSearch handleToggle={handleDrawerToggle} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  )
}

ParticipantSearchDrawer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ParticipantSearchDrawer
