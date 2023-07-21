import styled from 'styled-components'



export const Container = styled.div`
    .logoutIcon, .listIcon{
        font-size: 20pt;
        cursor: pointer;

        @media(max-width: 300px){
            font-size: 15pt;
        }
    }

    fieldset{
        position: absolute;
        left: 50%;
        line-height: 35px;
        text-align: left;
        transform: translateX(-50%);
        width: 30vw;
        text-align: center;
        margin-top: 10vh;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 4px gray; 
        
        @media(max-width: 600px){
            width: 80vw;
        }

        @media(max-width: 300px){
            width: 80vw;
        }
    }

    legend{
        font-size: 16pt;
        text-align: center;

        @media(max-width: 600px){
            font-size: 12pt;
        }

        @media(max-width: 300px){
            font-size: 12pt;
        }
    }

    input{
        background: transparent;
        border: 1px solid;
        border-radius: 20px;
        height: 25px;
        padding: 0 10px;
        color: white;
        width: 25vw;
        
        @media(max-width: 600px){
            width: 70vw;
        }

        @media(max-width: 300px){
            width: 70vw;
        }
    }

    input[type='file']{
        border: none;
    }

    textarea{
        background-color: transparent;
        color: white;
    }

    input[type='button']{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            background-color: rgb(9, 6, 6);
        }

        @media(max-width: 600px){
            width: 20vw;
        }

        @media(max-width: 300px){
            width: 25vw;
        }
    }

    button{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover{
            background-color: rgb(9, 6, 6);
        }

        @media(max-width: 600px){
            width: 20vw;
        }

        @media(max-width: 300px){
            width: 25vw;
        }
    }

    .btnContainer{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .inputDate{
        width: 11vw;

        @media(max-width: 600px){
            width: 20vw;
        }
    }
`