import { convertDate } from '../utils/convertDate'
import styled from 'styled-components'


const Container = styled.div`
    position: relative;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid;
    border-radius: 10px;
    box-shadow: 2px 2px 4px;
    padding: 10px;
    width: 30vw;
    
    @media(max-width: 600px){
        width: 80vw;
    }
`


export default function Modal({ user }){

    return(
        <Container>
            <b>Email:</b> {user.email}<br/><br/>
            <b>Usuário criado em:</b> {convertDate(user.createdAt)}
        </Container>
    )
}