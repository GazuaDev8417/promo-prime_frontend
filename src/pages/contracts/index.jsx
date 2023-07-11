import { useEffect, useState, useContext } from "react"
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header"
import { AiOutlineLogout, AiFillLock, AiFillDelete } from 'react-icons/ai'
import { IoIosAddCircle} from 'react-icons/io'
import { FaFileContract } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import { convertDate } from "../../utils/convertDate"
import { Container } from './styled.js'



export default function Contracts(){
    const { setters } = useContext(Context)
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
                localStorage.clear()
                navigate('/')
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


    const goToEdit = (contract)=>{
        setters.setContract(contract)
        navigate('/edit')
    }


    const expirationAlert = (contract)=>{
        const operation = Date.parse(contract.expiresAt) - Date.now()
        const differenceInDays = Math.round(operation / (1000 * 60 * 60 * 24))
        
        return differenceInDays <= 30 ? alert(`Atenção!\nFaltam ${differenceInDays} dias para a expiração do contrato da empresa ${contract.company}`) : null
        
    }


    /* const delContract = (contract)=>{
        const decide = window.confirm(`Tem certeza que deseja excluir o contrado da empresa ${contract.company}?`)

        if(decide){
            axios.delete(`${url}/contract/${contract.id}`, {
                headers: {
                    Authorization: token.token
                }
            }).then(()=>{
                getContracts()
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    } */     
    
    

    return(
        <Container>
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
                    <td>Editar</td>
                </tr>
                {contracts && contracts.map(contract=>{
                    const operation = Date.parse(contract.expiresAt) - Date.now()
                    const differenceInDays = Math.round(operation / (1000 * 60 * 60 * 24))

                    return(
                        <tr key={contract.id}>
                            <td>{contract.company}</td>
                            <td>{convertDate(contract.signedAt)}</td>
                            <td>{convertDate(contract.expiresAt)}</td>
                            <td>                                
                                <FaFileContract className="tableicon"
                                    color={differenceInDays <= 30 ? 'red' : 'white'}
                                    onClick={()=>{
                                        expirationAlert(contract)
                                        window.open(`${url}/files/${contract.contractName}`)
                                    }}/></td>
                            <td>
                                <MdModeEditOutline className="tableicon"
                                    onClick={()=> goToEdit(contract)}/>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </Container>
    )
}