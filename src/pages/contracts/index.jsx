import { useEffect, useState, useContext } from "react"
import Context from "../../global/Context"
import axios from 'axios'
import { url } from '../../constants/url'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import { AiOutlineLogout } from 'react-icons/ai'
import { IoIosAddCircle} from 'react-icons/io'
import { FaFileContract } from 'react-icons/fa'
import { convertDate } from "../../utils/convertDate"
import './Contracts.css'



export default function Contracts(){
    const { setters } = useContext(Context)
    const navigate = useNavigate()
    const [contracts, setContracts] = useState([])




    useEffect(()=>{
        document.title = 'Promo Prime - Contratos'
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/')
        }

        getContracts()
    }, [])


    const getContracts = ()=>{
        axios.get(`${url}/contract`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            setContracts(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    const getContractName = (name)=>{
        setters.setContractName(name)
        navigate('/display-contract')
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
                rightItem={<AiOutlineLogout onClick={logout} className="logoutIcon"/>}
                leftItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="addIcon"/>}/>
            <h1>Lista de Contratos</h1>
            <table>
                <tr className="borderStyle">
                    <td>Empresa</td>
                    <td>Responsável</td>
                    <td>Data de assinatura</td>
                    <td>Contrato</td>
                </tr>
                {contracts && contracts.map(contract=>{
                    return(
                        <tr key={contract.id}>
                            <td>{contract.company}</td>
                            <td>{contract.owner}</td>
                            <td>{convertDate(contract.signedAt)}</td>
                            <td><FaFileContract className="icon"
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