import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { AiOutlineLogout } from 'react-icons/ai'
import { IoIosAddCircle} from 'react-icons/io'




export default function AdmArea(){
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(()=>{
        if(!token){
            navigate('/')
        }else if(token.user !== 'ADM'){
            navigate('/')
        }
    }, [])


    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/')
        }
    }

    return(
        <div className="container">
            <Header rightItem={<AiOutlineLogout onClick={logout} className="icon"/>}
                leftItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="icon"/>}/>
            <h1>Área de ADM</h1>
        </div>
    )
}