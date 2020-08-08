import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { rootStoreContext } from "../stores/RootStore"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"
import PreventionPointLogo from "../../public/img/logo.svg"
import AppBar from "@material-ui/core/AppBar"
import Badge from "@material-ui/core/Badge"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import NotificationsIcon from "@material-ui/icons/Notifications"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import GsTitle from "./GsTitle"
import clsx from "clsx"

const NavHeader = observer(({ drawerOpen, handleDrawerOpen, drawerWidth }) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      "& .navbar__logo": {
        marginRight: "auto",
      },
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(5),
    },
    hide: {
      display: "none",
    },
    navbarToolbar: {
      justifyContent: "flex-end",
      paddingTop: "8px",
      paddingBottom: "8px",
      "@media (max-width: 700px)": {
        flexWrap: "wrap",
      },
    },
    navbarHeader: {
      marginRight: "auto",
      "@media (max-width: 700px)": {
        display: "flex",
        justifyContent: "center",
        order: "6",
        width: "100%",
      },
    },
  }))

  const rootStore = useContext(rootStoreContext)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const classes = useStyles()

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleProfileMenuClose() {
    setAnchorEl(null)
  }

  return (
    <AppBar
      title="Prevention Point"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar className={classes.navbarToolbar}>
        {rootStore.authStore.isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src={PreventionPointLogo}
          alt="Prevention Point Logo"
          className="navbar__logo"
          width="150"
        />
        <div className={classes.navbarHeader}>
          <Typography variant="h6" color="inherit">
            <GsTitle />
          </Typography>
        </div>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleProfileMenuOpen} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
        >
          {rootStore.authStore.isAuthenticated ? (
            <div>
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleProfileMenuClose()
                  rootStore.authStore.logout()
                  history.push("/")
                }}
              >
                Sign out
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={handleProfileMenuClose}>Sign In</MenuItem>
            </div>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
})

export default NavHeader
