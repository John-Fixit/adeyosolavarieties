import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Footage from './Footage'
import LandingNav from './LandingNav'
import LandingPage from './LandingPage'

function AppLandingRoute() {
  const title = "products house"
  const type = "article"
  const name = "Adeyosola varieties"
  const description = "Deals with affordable and quality unisex wears such as roundneck, polo, Jean, joggers, armless,gown, Jalab, abaya, lingeries... Also we sell interior decorations,kitchen equipments, electronic gadgets and lots more"
  return (
    <>
        <LandingNav />
        <Routes> 
            <Route path='/' element={<LandingPage type={type} title={title} name={name} description={description}/>} />
            <Route path='/about' element={<About type={type} title={title} name={name} description={description}/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<LandingPage />} />
        </Routes>
        <Footage />
    </>
  )
}

export default AppLandingRoute