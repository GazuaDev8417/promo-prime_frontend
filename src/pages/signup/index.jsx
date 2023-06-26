import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../constants/url'
import './signup.css'
import Header from '../../components/Header'
import { MdKeyboardArrowLeft } from 'react-icons/md'



export default function Signup(props){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        email:'',
        user:'option1',
        password:'',
        confirmPass:''
    })


    useEffect(()=>{
        document.title = 'Promo Prime - Cadastro de usuário'
    }, [])

    const onChange = (e)=>{
        const { name, value } = e.target
        setForm({... form, [name]:value})
    }

    const limpar = ()=>{
        setForm({
            username:'',
            email:'',
            user:'',
            password:'',
            confirmPass:''
        })
    }

    const signup = (e)=>{
        e.preventDefault()

        const body = {
            username: form.username,
            email: form.email,
            role: form.user,
            password: form.password,
            confirmPass: form.confirmPass
        }
        axios.post(`${url}/signup`, body).then(res=>{
            localStorage.setItem('token', JSON.stringify(res.data))
            navigate('/contracts')
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    return(
        <div className='container'>
            <Header 
                leftItem={<MdKeyboardArrowLeft 
                    onClick={()=> navigate('/')}
                    className='leftIcon'/>}
                rightItem={<div></div>}/>
            <form onSubmit={signup}>
                <fieldset>
                    <legend>Cadastro</legend>
                    <input type="text" name="username" id="username"
                        value={form.username} onChange={onChange} 
                        placeholder='Nome e sobrenome' required/>
                    <input type="email" name='email' value={form.email} id='email'
                        onChange={onChange} placeholder='nome@email.com' required/>
                    <select name='user' value={form.user} onChange={onChange}>
                        <option value="option1" style={{color:'black'}}>Tipo de usuário</option>
                        <option value="DEFAULT" style={{color:'black'}}>Padrão</option>
                        <option value="ADM" style={{color:'black'}}>ADM</option>
                    </select>
                    <input type="password" name='password' value={form.password} id='password'
                        onChange={onChange} placeholder='Sua senha' required/>
                    <input type="password" name="confirmPass" id="password"
                        onChange={onChange}
                        value={form.confirmPass} placeholder='Repita sua senha' />

                    <div>
                        <input type='button' value='Limpar' onClick={limpar}/>
                        <button type="submit">Entrar</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}