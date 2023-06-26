import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../constants/url'
import Header from '../../components/Header'
import { FaUserPlus } from 'react-icons/fa'
import './login.css'





export default function Login(props){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:'visitante@email.com',
        password:'123456'
    })


    useEffect(()=>{
        document.title = 'Promo Prime - Login'
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/contracts')
        }
    }, [])


    const onChange = (e)=>{
        const { name, value } = e.target
        setForm({... form, [name]:value})
    }

    const limpar = ()=>{
        setForm({
            email:'',
            password:''
        })
    }

    const login = (e)=>{
        e.preventDefault()

        const body = {
            email: form.email,
            password: form.password
        }

        axios.post(`${url}/login`, body).then(res=>{
            localStorage.setItem('token', JSON.stringify(res.data))
            navigate('/contracts')
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    return(
        <div className='container'>
            <Header leftItem={<div></div>} 
                rightItem={<FaUserPlus onClick={()=> navigate('/signup')}
                    className='rightIcon'/>}/>
            <form onSubmit={login}>
                <fieldset>
                    <legend>Acesso</legend>
                    {/* <label htmlFor="email">Eamil: </label> */}
                    <input type="email" name='email' value={form.email} id='email'
                        onChange={onChange} placeholder='nome@email.com' required/>
                    {/* <label htmlFor="password">Senha: </label> */}
                    <input type="password" name='password' value={form.password} id='password'
                        onChange={onChange} placeholder='Sua senha' required/>
                    <div>
                        <input type='button' value='Limpar' onClick={limpar}/>
                        <button type="submit">Entrar</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}