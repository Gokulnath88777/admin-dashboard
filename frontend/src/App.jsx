import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { ToastContainer } from "react-toastify";
import PageRoutes from './Routes/PageRoutes';
function App() {
  return (


    <BrowserRouter>
      <ToastContainer position="top-right"
        style={{ marginTop: "55px" }} />
          <PageRoutes />
    </BrowserRouter>
  )
}

export default App
