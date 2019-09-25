import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

// Fix to a material ui related issue that jest doesnt like.  These two lines suppress a warning about using useLayoutEffect
import React from "react"
React.useLayoutEffect = React.useEffect
