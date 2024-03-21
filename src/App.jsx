import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import './styles/main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routePath from './Routes/Path'
import DashBoard from './pages/DashBoard/DashBoard'
import AddStock from './pages/stock/AddStock'
import AddMultipleBtn from './components/Buttons/AddMultipleBtn'
import AddMultipleStocks from './components/stock/AddMultipleStocks'
import SaleOrder from './pages/saleorder/SaleOrder'
import AddSaleOrder from './pages/saleorder/AddSaleOrder'
import Notification from './pages/stock/Notification'

function App() {
  const [count, setCount] = useState(0)

let token = localStorage.getItem('token')
console.log('tok',token);

  return (
    <>
    <BrowserRouter>

  
    <Routes>
      <Route path='/' element={<Login/>}></Route>
{/* {token&& */}
  <>
      <Route path ={routePath?.HOME} element={<DashBoard/>}/>
      <Route path ={'/'} element = {<DashBoard/>}>

      <Route path ={routePath?.STOCK} element={<AddStock/>}/>
      <Route path ={routePath?.ADDSTOCKS} element={<AddMultipleStocks/>}/>
      <Route path ={routePath?.SALEORDER} element={<SaleOrder/>}/>
      <Route path ={routePath?.ADDSALEORDER} element={<AddSaleOrder/>}/>
      <Route path ={routePath?.EDITSALEORDER} element={<AddSaleOrder/>}/>
      <Route path ={routePath?.NOTIFIACTION} element={<Notification/>}/>

        </Route>
        </>
        {/* } */}

      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
