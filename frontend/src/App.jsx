import React from 'react'
import Navbar from './components/shared/Navbar'
import BrowseRouter from { createBrowserRouter } from 'react-router-dom'
import Login from './components/shared/auth/Login'
import SignUp from './components/shared/auth/SignUp'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  }
])

const App = () => {
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default App