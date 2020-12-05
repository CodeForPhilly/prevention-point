import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { makeStyles } from "@material-ui/core/styles"
import ParticipantSearch from "../components/ParticipantSearch"
import SepForm from "../components/SepForm"
import { SEARCH, SEP } from "../constants"
import { rootStoreContext } from "../stores/RootStore"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 1, 0, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1, 1, 0, 3),
    },
  },
  closeButton: {
    marginLeft: "auto",
  },
  select: {
    width: "100%",
    marginRight: theme.spacing(1),
  },
}))

const Sidebar = observer(({ handleDrawerClose }) => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const utilityStore = rootStore.UtilityStore

  return (
    <>
      <div className={classes.drawerHeader}>
        <Select
          name="sidebarForm"
          value={utilityStore.sidebarView}
          onChange={e => utilityStore.setSidebarView(e.target.value)}
          className={classes.select}
        >
          <MenuItem value={SEARCH}>Participant Search</MenuItem>
          <MenuItem value={SEP}>SEP Search</MenuItem>
        </Select>
        <IconButton onClick={handleDrawerClose} className={classes.closeButton}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      {utilityStore.sidebarView === SEARCH && <ParticipantSearch />}
      {utilityStore.sidebarView === SEP && (
        <SepForm
          sites={participantStore.sites}
          currentSite={participantStore.currentSite}
          setCurrentSite={participantStore.setCurrentSite}
        />
      )}
    </>
  )
})

export default Sidebar
