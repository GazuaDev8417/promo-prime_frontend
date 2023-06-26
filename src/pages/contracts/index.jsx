import { useEffect, useState } from "react"
import axios from 'axios'
import { url } from '../../constants/url'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import { AiOutlineLogout } from 'react-icons/ai'
import { IoIosAddCircle} from 'react-icons/io'
import { FaFileContract } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { convertDate } from "../../utils/convertDate"
import './Contracts.css'



export default function Contracts(){
    const navigate = useNavigate()
    const [contracts, setContracts] = useState([])
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


    const deleteFile = (contract)=>{
        const decide = window.confirm(`Tem certeza que deseja excluir o registro do contrato de ${contract.company}?`)

        if(decide){
            axios.delete(`${url}/contract/${contract.id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(()=>{
                getContracts()
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }

    

    return(
        <div className="container">
            <Header 
                rightItem={<AiOutlineLogout onClick={logout} className="logoutIcon"/>}
                leftItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="addIcon"/>}/>
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
                            <td>{contract.signedAt}</td>
                            <td>{convertDate(contract.expiresAt)}</td>
                            <td>
                                <FaFileContract className="icon"
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