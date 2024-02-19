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

        </Route>
        </>
        {/* } */}

      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
