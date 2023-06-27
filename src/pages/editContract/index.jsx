import { useEffect, useState, useContext } from "react"
import Context from '../../global/Context'
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { url } from '../../constants/url'
import { AiOutlineLogout } from 'react-icons/ai'
import { BsCardList } from 'react-icons/bs'
import './editContract.css'




export default function EditContract(){
    const { states } = useContext(Context)
    const contract = states.contract
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
    const [form, setForm] = useState({
        company:'',
        signedAt:'',
        expiresAt:'',
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
    

    const edit = (e)=>{
        e.preventDefault()

        const body = {
            company: form.company,
            signedAt: form.signedAt,
            expiresAt: form.expiresAt,
        }
        
        axios.put(`${url}/contract/${contract.id}`, body, {
            headers: {
                Authorization: token.token,
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            alert(res.data)
        }).catch(e=>{
            if(e.response.data === 'jwt expired'){
                alert('Sua sessão expirou. Faça login novamente')
            }else{
                alert(e.response.data)
            }
        })

    }

    const limpar = ()=>{
        setForm({
            company:'',
            owner:'',
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

            <form onSubmit={edit}>
                <fieldset>
                    <legend>Editando {contract.company}</legend>
                    <input type="text" name="company" value={form.company}
                        onChange={onChange} placeholder="Nome da empresa" required/>
                    <label htmlFor="signedAt">Data de assinatura: &ensp;</label>
                    <input type="date" name="signedAt" id="signedAt" value={form.signedAt}
                        onChange={onChange} required/>
                    <label htmlFor="expiresAt">Data de expiração: &ensp;</label>
                    <input type="date" name="expiresAt" value={form.expiresAt}
                        onChange={onChange} required/>
                    <div>
                        <input type="button" value="Limpar" onClick={limpar} />
                        <button type="submit">Atualizar</button>
                    </div>                                        
                </fieldset>
            </form>
        </div>
    )
}