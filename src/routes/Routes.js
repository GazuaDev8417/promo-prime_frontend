import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/signup'
import Login from '../pages/login'
import Contracts  from '../pages/contracts'
import InsertContract from '../pages/insertContract'



export default function Router(){
    return(
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/contracts' element={<Contracts/>}/>
            <Route exact path='/insert-contract' element={<InsertContract/>}/>
        </Routes>
    )
}