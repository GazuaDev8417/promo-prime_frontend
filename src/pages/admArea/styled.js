import styled from 'styled-components'



export const Container = styled.div`
    .icon{
        font-size: 20pt;
        cursor: pointer;

        @media(max-width: 300px){
            font-size: 15pt;
        }
    }

    h1{
        font-weight: 500;
        text-align: center;
        margin-bottom: 10vh;

        @media(max-width: 300px){
            font-size: 15pt;
        }

    }

    h3{
        margin-left: 10px;

        @media(max-width: 300px){
            font-size: 12pt;
        }
    }

    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 15px;

        @media(max-width: 600px){
            grid-template-columns: repeat(2, 1fr);
        }

        @media(max-width: 300px){
            display: flex;
            flex-direction: column;
        }
    }

    .card{
        padding: 8px;
        width: 30vw;
        border: 1px solid;
        box-shadow: 2px 2px 4px;

        @media(max-width: 600px){
            width: 40vw;
        }

        @media(max-width: 300px){
            width: 80vw;
        }
    }

    .title{
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }
`