// import React, { useContext, useEffect } from "react"
// import { rootStoreContext } from "../stores/RootStore"
// import ParticipantsList from "../components/ParticipantsList"

// const ParticipantsResults = () => {
//   const rootStore = useContext(rootStoreContext)
//   const participantsStore = rootStore.ParticipantStore

//   // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
//   useEffect(() => {
//     console.log("hi")
//     console.log(participantsStore.getParticipant())
//   }, [])

//   return (
//     <div>
//       <ParticipantsList />
//     </div>
//   )
// }

// export default ParticipantsResults
