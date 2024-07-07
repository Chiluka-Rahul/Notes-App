import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const routes = (
  <Router>
    <Routes>
      <Route path = "/dashboard" exact element={<Home />}/>
      <Route path = "/" exact element={<Login />}/>
      <Route path = "/signup" exact element={<Signup />}/>
    </Routes>
  </Router>
) 


const App = () => {
  return (
    <div className='bg-gray-900 h-screen'>
      {routes}
    </div>
  )
}

export default App