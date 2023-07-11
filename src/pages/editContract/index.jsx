import { useEffect, useState, useContext } from "react"
import Context from '../../global/Context'
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { url } from '../../constants/url'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsCardList } from 'react-icons/bs'
import { convertDate } from '../../utils/convertDate'
import { Container } from './styled.js'




export default function EditContract(){
    const { states } = useContext(Context)
    const contract = states.contract
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    const [selectedFile, setSelectedFile] = useState(null)
    const [form, setForm] = useState({
        company: contract.company,
        signedAt: convertDate(contract.signedAt),
        expiresAt: convertDate(contract.expiresAt),
        contractUpdates:''
    }) 



    useEffect(()=>{
        document.title = 'Promo Prime - Editar contratos'
    }, [])

    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    }, [])
    

    const onChange = (e)=>{
        const { name, value } = e.target
        setForm({... form, [name]:value})
    }

    const handleFileChange = (e)=>{
        setSelectedFile(e.target.files[0])
    }
    

    const edit = (e)=>{
        e.preventDefault()
        var signedAtParts = form.signedAt.split('/')
        var expiresAtParts = form.expiresAt.split('/')

        const formData = new FormData()
        formData.append('company', form.company)
        formData.append('signedAt', `${signedAtParts[2]}-${signedAtParts[1]}-${signedAtParts[0]}`)
        formData.append('expiresAt', `${expiresAtParts[2]}-${expiresAtParts[1]}-${expiresAtParts[0]}`)
        formData.append('contractName', selectedFile?.name)
        formData.append('contract', selectedFile)
        formData.append('contractUpdates', form.contractUpdates)
        
        axios.put(`${url}/contract/${contract.id}`, formData, {
            headers: {
                Authorization: token.token,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            alert(res.data)
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

    const limpar = ()=>{
        setForm({
            company:'',
            signedAt:'',
            expiresAt:'',
            contractUpdates:''
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
        <Container>
            <Header 
                leftItem={<BsCardList
                    onClick={()=> navigate('/contracts')} 
                    className="listIcon"/>}
                rightItem={<AiOutlineLogout onClick={logout} className="logoutIcon"/>}/>

            <form onSubmit={edit}>
                <fieldset>
                    <legend>Editando {contract.company}</legend>
                    <input type="text" name="company" value={form.company}
                        onChange={onChange} placeholder="Nome da empresa" required/><br/>
                    <label htmlFor="signedAt">Data de assinatura: &ensp;</label>
                    <input type="text" id="signedAt" name="signedAt" onChange={onChange}
                        value={form.signedAt} className="inputDate" required/><br/>
                    <label htmlFor="expiresAt">Data de expiração: &ensp;</label>
                    <input type="text" name="expiresAt" value={form.expiresAt} 
                        onChange={onChange} id="expiresAt"
                        maxLength={10} className="inputDate" required/>
                    <input type="file" onChange={handleFileChange} accept=".pdf"/>
                    <textarea
                        name="contractUpdates"
                        value={form.contractUpdates}
                        onChange={onChange}
                        placeholder="Se houve mudanças nos termos do contrato especifique aqui" 
                        className='contract-updates'
                        cols="30" rows="5"></textarea>
                    <div className="btnContainer">
                        <input type="button" value="Limpar" onClick={limpar} />
                        <button type="submit">Atualizar</button>
                    </div>                                        
                </fieldset>
            </form>
        </Container>
    )
}