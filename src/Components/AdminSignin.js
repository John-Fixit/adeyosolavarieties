import React, { useState } from 'react'
import style from './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { baseUrl } from './URL'
import {ToastContainer, toast} from "react-toastify"
import Loader from "react-spinners/BarLoader"
function AdminSignin() {
  const signinURI = `${baseUrl}/admin/signin`
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const [isGoing, setisGoing] = useState(false)
  const [fEmail, setfEmail] = useState("")
  const [sending, setsending] = useState(false)
  const navigate = useNavigate()

  const toastOption = {position: "top-center", pauseOnHover: true, theme: "colored", autoClose: 8000, closeButton: true}

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      privateKey: ''
    },
    onSubmit: (values) => {
      setisGoing(true)
      axios.post(signinURI, values).then((res) => {
        setisLoading(false)
        setisGoing(false)
        const responseFromServer = res.data
        setstatus(responseFromServer.status)
        if (responseFromServer.status) {
          localStorage.setItem('admintoken', JSON.stringify(responseFromServer.admintoken))
          navigate('/admin/home')
        }
        else {
          setstatus(responseFromServer.status)
          setmessage(responseFromServer.message)
        }
      })
    },
    validationSchema: yup.object({
      email: yup.string().required('This field is required').email('Please input a valid email'),
      password: yup.string().required('This field is required'),
      privateKey: yup.string().required('You must provide your digit private key')
    })
  })

  const sendEmail=()=>{
    setsending(true)
    axios.get(`${baseUrl}/admin/forgotPryKey?email=${fEmail}`).then((res)=>{
      const {message, status} = res.data
            status?
              toast.success(message, toastOption):
              toast.success(message, toastOption)
    }).catch((err)=>{
      toast.error(err.message, toastOption)
    }).finally(()=>{
      setsending(false)
    })

}
  return (
    <>
      <div className='container p-sm'>
        <div className='row shadow p-3 rounded'>
          <div className='col-sm-6 card h-100 bgs text-center p-sm-5 rounded-3'>
            <div className='adminLog'>
              <div className='py-4'>
                <h1 className='fw-bold'>ADMIN LOG IN PAGE</h1>
                <p className='fw-bold'>Login safely to your account with no stress!</p>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='card h-100 border-0 form'>
              <form action='' onSubmit={formik.handleSubmit}>
                <h2 className='card-header text-center text-muted py-3'>Admin Log In </h2>
                <div className='col-12'>
                  {
                    isLoading ? ' ' : status ? " " : <p className='alert alert-danger text-center'>{message}</p>
                  }
                </div>
                <div className='email'>
                  <div className='form-floating mt-4'>
                    <input type='text' className='form-control border-0' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='Email address' />
                    <label htmlFor=''>Email Address</label>
                  </div>
                  {
                    formik.touched.email ? <small className='text-danger ms-3'>{formik.errors.email}</small> : ''
                  }
                </div>
                <div className='password'>
                  <div className='form-floating mt-4'>
                    <input type='password' className='form-control border-0' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder='password' />
                    <label htmlFor=''>Password</label>
                  </div>
                  {
                    formik.touched.password ? <small className='text-danger ms-3'>{formik.errors.password}</small> : ''
                  }
                </div>
                <div className='privateKey'>
                  <div className='form-floating mt-4'>
                    <input type='password' className='form-control border-0' name='privateKey' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.privateKey} placeholder='privateKey' />
                    <label htmlFor=''>Your privateKey</label>
                  </div>
                  {
                    formik.touched.privateKey ? <small className='text-danger ms-3'>{formik.errors.privateKey}</small> : ''
                  }
                </div>
                <div className='col-sm-12 ms-3 mt-3'>
                <p className='textColor forgotPsw' style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal"><i>Forgotten Private Key?</i></p>
                </div>
                <div className='col-sm-12 ms-3 mt-3'>
                  <Link to={'/recov_email'} className='textColor forgotPsw' style={{cursor: "pointer"}}><i>Forgotten Password?</i></Link>
                  <p className='text-muted fs-5 '>Login as a staff | <Link to='/staff_login' className='text-decoration-none'>Sign in</Link></p>
                </div>
                <div className='button mt-4'>
                  <button className="btn bgs text-center w-100 text-white fs-5" type='submit'>{isGoing ? <div className="spinner-border text-white opacity-50" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> : 'Login account'}</button>
                </div>
              </form>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Recover Private Key</h5>
                   </div>
                    <Loader width={"100%"} color={"orangered"} loading= {sending}/>
                  <div className="modal-body">
                    <div className=''>
                    <i>
                    Enter the email address of your
                    account. we'll send you email with your private Key.
                  </i>
                      <input type="email" required className='form-control' onChange={(e)=>setfEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className={`btn btn-primary ${!!(fEmail)?"": 'disabled'}`} onClick={sendEmail}>Send</button>
                  </div>
                </div>
              </div>
            </div>
<ToastContainer />

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignin