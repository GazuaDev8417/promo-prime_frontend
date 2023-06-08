import { BrowserRouter } from "react-router-dom"
import { GlobalState } from "./global/Context";
import Router from "./routes/Routes"

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
        <Router/>
      </GlobalState>
    </BrowserRouter>
  )
}

export default App;
