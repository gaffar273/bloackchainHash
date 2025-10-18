import React from 'react'
import Home from './page/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './page/Welcome'

const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App 