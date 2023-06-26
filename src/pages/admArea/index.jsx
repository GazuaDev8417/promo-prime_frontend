import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { url } from '../../constants/url'
import { BsCardList } from 'react-icons/bs'
import { IoIosAddCircle} from 'react-icons/io'
import './AdmArea.css'




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
            alert(e.response.data)
        })
    }


    return(
        <div className="container">
            <Header leftItem={<BsCardList onClick={()=> navigate('/contracts')} className="icon"/>}
                rightItem={<IoIosAddCircle onClick={()=> navigate('/insert-contract')}
                    className="icon"/>}/>
            <h1>Área de ADM</h1>

            <div className="content">
                    <h3>Atividades dos usuários</h3>
                    {tasks.length > 0 ? (
                        tasks.map(task=>{
                            return(
                                <div key={task.id} className="card">
                                    {task.task}
                                </div>
                            )
                        })
                    ) : null}
            </div>
        </div>
    )
}