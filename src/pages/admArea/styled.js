import styled from 'styled-components'



export const Container = styled.div`
    .icon{
        font-size: 20pt;
        cursor: pointer;
    }

    h1{
        font-weight: 500;
        text-align: center;
        margin-bottom: 10vh;
    }

    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .card{
        padding: 8px;
        width: 30vw;
        border: 1px solid;
        box-shadow: 2px 2px 4px;
    }

    .title{
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }
`