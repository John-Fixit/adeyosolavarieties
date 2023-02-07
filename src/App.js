import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminHome from './Components/AdminHome'
import AdminPage from './Components/AdminPage'
import AdminSignin from './Components/AdminSignin'
import AppLandingRoute from './Components/AppLandingRoute'
import Staff from './Components/Staff'
import StaffLogin from './Components/StaffLogin'
import { SWRConfig } from 'swr'
import axios from 'axios'
import ForgotPsw from './Components/ForgotPsw'
import ResetPsw from './Components/ResetPsw'
function App() {

  const fetcher = (...args)=> axios.get(...args) 

  return (
    <>

    <SWRConfig value={{fetcher:fetcher}}>
      <Routes>
        <Route path='/*' element={<AppLandingRoute />} />
        <Route path='/admin_login' element={<AdminSignin />}/>
        <Route path='/staff_login' element={<StaffLogin />}/>
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/staff/*' element={<Staff />} />
        <Route path='/recov_email' element={<ForgotPsw />} />
        <Route path='/reset_password/:resetToken' element={<ResetPsw />} />
        <Route path='*' element={<AppLandingRoute />} />
        
      </Routes>
    </SWRConfig>
    </>

    //https://wa.me/<number>
    //https://wa.me/552196312XXXX?text=messageToSend
  )
}

export default App