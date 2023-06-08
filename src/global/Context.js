import { useState, createContext } from "react"


const Context = createContext()


export const GlobalState = (props)=>{
    

    const states = {}
    const setters = {}
    const requests = {}


    return(
        <Context.Provider value={{ states, setters, requests }}>
            { props.children }
        </Context.Provider>
    )
}


export default Context