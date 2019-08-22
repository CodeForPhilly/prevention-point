import React, { useState, useContext } from "react"
import { withRouter } from "react-router-dom"
import { rootStoreContext } from "../stores/RootStore"
import { observer } from "mobx-react-lite"
import PreventionPointLogo from "../../public/img/logo.svg"
import "../scss/navbar.scss"
import AppBar from "@material-ui/core/AppBar"
import Badge from "@material-ui/core/Badge"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import AccountCircle from "@material-ui/icons/AccountCircle"
import NotificationsIcon from "@material-ui/icons/Notifications"
import Typography from "@material-ui/core/Typography"
import GsTitle from "./GsTitle"

const NavHeader = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const AccountMenu = withRouter(({ history }) => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {rootStore.authStore.isAuthenticated ? (
        <div>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose()
              rootStore.authStore.logout()
              history.push("/")
            }}
          >
            Sign out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
        </div>
      )}
    </Menu>
  ))

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  return (
    <AppBar className="navbar" title="Prevention Point" position="static">
      <Toolbar className="navbar__toolbar">
        <img
          src={PreventionPointLogo}
          alt="Prevention Point Logo"
          className={"navbar__logo"}
          width="150"
        />
        <div className={"navbar__header"}>
          <Typography variant="h6" color="inherit">
            <GsTitle />
          </Typography>
        </div>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
})

export default NavHeader
