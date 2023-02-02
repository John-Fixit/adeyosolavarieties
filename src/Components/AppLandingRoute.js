import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Footage from './Footage'
import LandingNav from './LandingNav'
import LandingPage from './LandingPage'

function AppLandingRoute() {
  return (
    <>
        <LandingNav />
        <Routes> 
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<LandingPage />} />
        </Routes>
        <Footage />
    </>
  )
}

export default AppLandingRoute