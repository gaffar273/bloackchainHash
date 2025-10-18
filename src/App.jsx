import React from 'react'
import Home from './page/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Welcome from './page/Welcome'
import HashingWorkflowCanvas from './components/HashingWorkflowCanvas.jsx'
import Explore from './page/Explore.jsx'

const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/explore' element={<Explore/>}/>
      </Routes>
    </div>
  )
}

export default App 