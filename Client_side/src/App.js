import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminHome from './Components/AdminHome'
import AdminPage from './Components/AdminPage'
import AdminSignin from './Components/AdminSignin'
import AppLandingRoute from './Components/AppLandingRoute'
import Staff from './Components/Staff'
import StaffLogin from './Components/StaffLogin'
function App() {

  return (
    <>
      <Routes>
        <Route path='/*' element={<AppLandingRoute />} />
        <Route path='/admin_login' element={<AdminSignin />}/>
        <Route path='/staff_login' element={<StaffLogin />}/>
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/staff/*' element={<Staff />} />
        <Route path='*' element={<AppLandingRoute />} />
        
      </Routes>
    </>

    //https://wa.me/<number>
    //https://wa.me/552196312XXXX?text=messageToSend
  )
}

export default App