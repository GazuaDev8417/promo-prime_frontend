import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { url } from '../../constants/url'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsCardList } from 'react-icons/bs'
import './InsertContract.css'




export default function InsertContract(){
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const token = JSON.parse(localStorage.getItem('token'))
    const [form, setForm] = useState({
        company:'',
        signedAt:'',
        expiresAt:'',
    }) 



    useEffect(()=>{
        document.title = 'Promo Prime - Registrar contratos'
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
   
    
    const registContract = ()=>{
        const formData = new FormData()
        formData.append('contract', selectedFile)
        console.log(formData)
        
        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token.token
            }
        }
        axios.post(`${url}/contractFile/${form.company}`, formData, headers).then(res=>{
            alert(res.data)
            limpar()
        }).catch(e=>{
            if(e.response.data === 'jwt expired'){
                alert('Sua sessão expirou. Faça login novamente')
            }else{
                alert(e.response.data)
            }
        })
    }

    const sendContractData = (e)=>{
        e.preventDefault()
        
        if(!selectedFile){
            alert('Selecione o arquivo do contrato')
        }else{
            const body = {
                company: form.company,
                signedAt: form.signedAt,
                expiresAt: form.expiresAt,
                contractName: selectedFile.name
            }
            
            axios.post(`${url}/contract`, body, {
                headers: {
                    Authorization: token.token,
                    'Content-Type': 'application/json'
                }
            }).then(()=>{
                registContract()
            }).catch(e=>{
                if(e.response.data === 'jwt expired'){
                    alert('Sua sessão expirou. Faça login novamente')
                }else{
                    alert(e.response.data)
                }
            })
        }

    }

    const limpar = ()=>{
        setForm({
            company:'',
            expiresAt:'',
            signedAt:''
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

            <form onSubmit={sendContractData}>
                <fieldset>
                    <legend>Registro de contratos</legend>
                    <input type="text" name="company" value={form.company}
                        onChange={onChange} placeholder="Nome da empresa" required/>
                    <label htmlFor="signedAt">Data de assinatura: &ensp;</label>
                    <input type="date" name="signedAt" id="signedAt" value={form.signedAt}
                        onChange={onChange} required/>
                    <label htmlFor="expiresAt">Data de expiração: &ensp;</label>
                    <input type="date" name="expiresAt" value={form.expiresAt}
                        onChange={onChange} required/>
                    <input type="file" onChange={handleFileChange} accept=".pdf"/>
                    <div>
                        <input type="button" value="Limpar" onClick={limpar} />
                        <button type="submit">Registrar</button>
                    </div>                                        
                </fieldset>
            </form>
        </div>
    )
}