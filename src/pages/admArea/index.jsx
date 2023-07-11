import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { url } from '../../constants/url'
import { BsCardList } from 'react-icons/bs'
import { IoIosAddCircle} from 'react-icons/io'
import { Container } from './styled.js'




export default function AdmArea(){
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const token = JSON.parse(localStorage.getItem('token'))
    


    useEffect(()=>{
        if(!token){
            navigate('/')
        }else if(token.user !== 'ADM'){
            navigate('/')
        }

        getTasks()
    }, [])


    const getTasks = ()=>{
        axios.get(`${url}/tasks`, {
            headers: {
                Authorization: token.token
            }
        }).then(res=>{
            setTasks(res.data)
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


    const sortByTime = tasks && tasks.sort((current, next)=>{
        return next.moment - current.moment
    })


    return(
        <Container>
            <Header leftItem={<BsCardList onClick={()=> navigate('/contracts')} className="icon"/>}
                rightItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="icon"/>}/>
            <h1>Área de ADM</h1>

            <h3>Atividades dos usuários</h3>
            <div className="content">
                {sortByTime.length > 0 ? (
                    sortByTime.map(task=>{
                        return(
                            <div key={task.id} className="card">
                                <div className="title">{task.user}</div>
                                <b>Email:</b> {task.email}<br/>
                                <b>Data: </b>{task.moment}<br/>
                                <b>Atividade: </b>{task.task}
                            </div>
                        )
                    })
                ) : null}
            </div>
        </Container>
    )
}