import SettingsContext from "./SettingsContext"
import { useState } from 'react'

function Provider(props) {
    const [settings, setSettings] = useState("On")

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default Provider