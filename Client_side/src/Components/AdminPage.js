import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome'
import AdminNav from './AdminNav'
import Adminsignup from './Adminsignup'
import CustomerList from './CustomerList'
import Footage from './Footage'
import UploadProducts from './UploadProducts'
import axios from 'axios'
import AdminProfile from './AdminProfile'
import Staff from './Staff'
import StaffNav from './StaffNav'
import StaffSignup from './StaffSignup'
import About from './About'

function AdminPage() {

  const getHomeURI = 'https://adeyosolavarieties.herokuapp.com/admin/home'
  const customerURI = 'https://adeyosolavarieties.herokuapp.com/admin/customers'
  const navigate = useNavigate()
  const [staff, setstaff] = useState([])
  const [products, setproducts] = useState('')
  const [firstname, setfirstname] = useState('')
  const [username, setusername] = useState('')
  const [profilePhoto, setprofilePhoto] = useState('')
  const [adminDetail, setadminDetail] = useState('')
  useEffect(() => {
    authorizeUser()
  }, [])
  const authorizeUser = () => {
    const admintoken = JSON.parse(localStorage.getItem('admintoken'))
    axios.get(getHomeURI, {
      headers: {
        'Authorization': `Bearer ${admintoken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      const responseFromServer = res.data.thisadmin
      setadminDetail(()=>{return res.data.thisadmin})
      if (res.data.status) {
        const adminInfo = { adminId: responseFromServer._id, email: responseFromServer.email, firstname: responseFromServer.firstname, lastname: responseFromServer.lastname }
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
        setfirstname(()=>{return responseFromServer.firstname})
        setusername(()=>{return responseFromServer.username})
        setprofilePhoto(()=>{return responseFromServer.profilePhoto})
        axios.get(customerURI).then((res) => {
          if(res.data.status){
            setstaff (()=>{return res.data.admins})
            setproducts (()=>{return res.data.products})
          }
          else{
            setstaff(0)
            setproducts(0)
          }
        })

      } else {
        localStorage.removeItem('admintoken')
        localStorage.removeItem('adminInfo')
        navigate('/admin_login')
      }
    })
  }


  return (
    <>
    <AdminNav firstname = {firstname} profilePhoto={profilePhoto}/>
        <Routes>
            <Route path='/home' element={<AdminHome staff={staff} products={products}/>}/>
            <Route path='/customers' element={<CustomerList staff={staff} adminDetail={adminDetail}/>}/>
            <Route path='/addProduct' element={<UploadProducts adminDetail={adminDetail}/>} />
            <Route path='/signup' element={<Adminsignup username={username}/>}/>
            <Route path='/create-staff-account' element={<StaffSignup username={username}/>}/>
            <Route path='/profile' element={<AdminProfile adminDetail={adminDetail}/>} />
            <Route path='/about' element={<About />} />
        </Routes>
        <Footage />
    </>
  )
}

export default AdminPage