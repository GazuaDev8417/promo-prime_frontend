import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { url } from '../../constants/url'
import Context from "../../global/Context"
import Header from "../../components/Header"
import { BsCardList } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import './ContractDoc.css'



export default function ContractDoc(){
    const navigate = useNavigate()
    const { states } = useContext(Context)
    const contractName = states.contractName



    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/')
        }

        if(!contractName){
            navigate('/contracts')
        }

        showContractFile()
    }, [])


    const showContractFile = ()=>{
        axios.get(`${url}/files/${contractName}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res.data)
        }).catch(e=>{
            console.error(e)
        })
    }
    
    

    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/')
        }
    }


    return(
        <div className="container">
            <Header 
                leftItem={<BsCardList
                    onClick={()=> navigate('/contracts')} 
                    className="listIcon"/>}
                rightItem={<AiOutlineLogout onClick={logout} className="logoutIcon"/>}/>
        </div>
    )
}