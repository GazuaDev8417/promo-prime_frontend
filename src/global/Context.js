import { useState, createContext } from "react"


const Context = createContext()


export const GlobalState = (props)=>{
    const [contractName, setContractName] = useState('')
    

    const states = {contractName}
    const setters = {setContractName}
    const requests = {}


    return(
        <Context.Provider value={{ states, setters, requests }}>
            { props.children }
        </Context.Provider>
    )
}


export default Context