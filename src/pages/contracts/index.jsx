import { useEffect, useState } from "react"
import axios from 'axios'
import { url } from '../../constants/url'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import { AiOutlineLogout, AiFillLock } from 'react-icons/ai'
import { IoIosAddCircle} from 'react-icons/io'
import { FaFileContract } from 'react-icons/fa'
import { convertDate } from "../../utils/convertDate"
import './Contracts.css'



export default function Contracts(){
    const navigate = useNavigate()
    const [contracts, setContracts] = useState([])
    const [color, setColor] = useState('white')
    const token = JSON.parse(localStorage.getItem('token'))
    


    useEffect(()=>{
        document.title = 'Promo Prime - Contratos'
    }, [])

    useEffect(()=>{
        if(!token){
            navigate('/')
        }

        getContracts()
    }, [])


    const getContracts = ()=>{
        axios.get(`${url}/contract`, {
            headers: {
                Authorization: token.token
            }
        }).then(res=>{
            setContracts(res.data)
        }).catch(e=>{
            if(e.response.data === 'jwt expired'){
                alert('Sua sessão expirou. Faça login novamente')
            }else{
                alert(e.response.data)
            }
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
                rightItem={
                    token.user === 'ADM' ? <AiFillLock
                                                    onClick={()=> navigate('/adm')}
                                                    className="icon"/>
                    : <AiOutlineLogout onClick={logout} className="icon"/>
                }
                leftItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="icon"/>}/>
            <h1>Lista de Contratos</h1>
            <table>
                <tr className="borderStyle">
                    <td>Empresa</td>
                    <td>Data de assinatura</td>
                    <td>Data de expiração</td>
                    <td>Contrato</td>
                </tr>
                {contracts && contracts.map(contract=>{
                    return(
                        <tr key={contract.id}>
                            <td>{contract.company}</td>
                            <td>{convertDate(contract.signedAt)}</td>
                            <td>{convertDate(contract.expiresAt)}</td>
                            <td>                                
                                <FaFileContract className="tableicon"
                                    color={Date.parse(contract.expiresAt) <= Date.now() ? 'red' : color}
                                    onClick={()=>{
                                        window.open(`${url}/files/${contract.contractName}`, '__blank')
                            }}/></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}