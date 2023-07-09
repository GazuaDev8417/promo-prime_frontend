import styled from 'styled-components'


export const Container = styled.div`
    .leftIcon{
        font-size: 30pt;
        cursor: pointer;
    }

    fieldset{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        width: 30vw;
        margin-top: 10vh;
        line-height: 40px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 4px gray;
    }

    legend{
        font-size: 16pt;
        text-align: center;
    }

    input{
        background: transparent;
        border: 1px solid;
        border-radius: 20px;
        height: 25px;
        padding-left: 10px;
        color: white;
        width: 25vw;
    }

    select{
        background: transparent;
        border: 1px solid;
        border-radius: 20px;
        height: 25px;
        padding-left: 10px;
        width: 26vw;
        color: white;
        border-color: white;
    }

    fieldset div{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;    
    }

    fieldset button{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    fieldset input[type="button"]{
        width: 10vw;
        height: 25px;
        background-color: rgb(36, 33, 33);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    fieldset input[type='button']:hover{
        background-color: rgb(9, 6, 6);
    }

    fieldset button:hover{
        background-color: rgb(9, 6, 6);
    }
`