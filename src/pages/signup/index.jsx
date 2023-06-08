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
            password:'',
            confirmPass:''
        })
    }

    const signup = (e)=>{
        e.preventDefault()

        const body = {
            username: form.username,
            email: form.email,
            password: form.password,
            confirmPass: form.confirmPass
        }
        axios.post(`${url}/signup`, body).then(res=>{
            localStorage.setItem('token', res.data)
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
                    {/* <label htmlFor="username">Nome: </label> */}
                    <input type="text" name="username" id="username"
                        value={form.username} onChange={onChange} 
                        placeholder='Nome e sobrenome' required/>
                    {/* <label htmlFor="email">Eamil: </label> */}
                    <input type="email" name='email' value={form.email} id='email'
                        onChange={onChange} placeholder='nome@email.com' required/>
                    {/* <label htmlFor="password">Senha: </label> */}
                    <input type="password" name='password' value={form.password} id='password'
                        onChange={onChange} placeholder='Sua senha' required/>
                    {/* <label htmlFor="password">Confirme: </label> */}
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