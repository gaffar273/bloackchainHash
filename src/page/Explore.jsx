import React from 'react'
import Navbar from '../components/Navbar'
import HashingWorkflowCanvas from '../components/HashingWorkflowCanvas.jsx'
import Footer from '../components/Footer'

const Explore = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-black">
        <Navbar/>
        <div className="flex-1">
          <HashingWorkflowCanvas/>
        </div>
        <Footer/>
    </div>
  )
}
export default Explore