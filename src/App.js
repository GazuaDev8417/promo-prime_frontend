import { BrowserRouter } from "react-router-dom"
import { GlobalState } from "./global/Context"
import Router from "./routes/Routes"
import { createGlobalStyle } from "styled-components"
import Image from './img/wallpaper.png'


const GlobalStyle = createGlobalStyle`
  body{
    background-image: url(${Image});
    background-size: cover;
    color: white;
  }
`


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <GlobalState>
        <Router/>
      </GlobalState>
    </BrowserRouter>
  )
}

export default App;
