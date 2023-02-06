import React, { useState } from 'react'
import style from './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { baseUrl } from './URL'
import Loader from "react-spinners/BarLoader"
function Adminsignup({username}) {
  const passRegex = /^[\w]{6,}$/
  const contactRegex = /^[0][\d]{10}$/
  const signupURI = `${baseUrl}/admin/signup`
  const [isLoading, setisLoading] = useState(true)
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState(false)
  const [isGoing, setisGoing] = useState(false)
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      contact: '',
      email: '',
      gender: 'please select',
      profilePhoto: '',
      username: '',
      password: '',
      addedBy: username? username: "username",
      privateKey: '',
      role: 'Admin'
    },
    onSubmit: (values) => {
      setisGoing(true)
      axios.post(signupURI, values).then((res)=>{
        setisGoing(false)
        setisLoading(false)
        setmessage(res.data.message)
        if(res.data.status){
          setstatus(true)
          formik.values.firstname = ''
          formik.values.lastname = ''
          formik.values.contact = ''
          formik.values.email = ''
          formik.values.gender = ''
          formik.values.username = ''
          formik.values.password = ''
        }
      })
    },
    validationSchema: yup.object({
      firstname: yup.string().required('Firstname must be provided'),
      lastname: yup.string().required('Lastname must be provided'),
      contact: yup.string().required('Contact must be provided').matches(contactRegex, 'contact must start from zero and be valid 11 digit'),
      email: yup.string().required('Email Address must be provided').email('Please input a valid email'),
      password: yup.string().required('Password can not be blank').matches(passRegex, 'Password must not less than six character'),
    })
  })
  return (
    <>
      <div className='container cont_fluid'>
        <div className='row'>
        <div className='col-sm-6 bgs text-center pt-5'>
            <div className='mt-5'>
              <h1 className='text-light'>ADMIN SIGN UP PAGE</h1>
              <p className='text-light'>Create account for an Admin </p>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form'>
              <form action='' onSubmit={formik.handleSubmit}>
                {/* <h2 className='card-header text-center text-muted '>Admin Sign up</h2> */}
                <Loader loading={isGoing} color={"orangered"} width={"100%"}/>
                <div className='col-12'>
                  {
                    isLoading ? '' :
                    status ? <p className='alert alert-success text-center'>{message}</p>: <p className='alert alert-danger text-center'>{message}</p>
                  }
                </div>
                <div className='firstname'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control border-0' name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.firstname} placeholder='firstname' />
                    <label htmlFor=''>Firstname</label>
                  </div>
                  {
                    formik.touched.firstname ? <small className='text-danger'>{formik.errors.firstname}</small> : ''
                  }
                </div>
                <div className='lastname'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control border-0' name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname} placeholder='lastname' />
                    <label htmlFor=''>Lastname</label>
                  </div>
                  {
                    formik.touched.lastname ? <small className='text-danger'>{formik.errors.lastname}</small> : ''
                  }
                </div>
                <div className='contact'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control border-0' name='contact' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contact} placeholder='Contact' />
                    <label htmlFor=''>Phone Contact</label>
                  </div>
                  {
                    formik.touched.contact ? <small className='text-danger'>{formik.errors.contact}</small> : ''
                  }
                </div>
                <div className='email'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control border-0' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='Email address' />
                    <label htmlFor=''>Email Address</label>
                  </div>
                  {
                    formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''
                  }
                </div>
                <div className=' form-floating mt-2'>
                  <select className='form-control border-0' name='gender' value={formik.values.gender} onChange={formik.handleChange}>
                    <option value='Please select'>Please select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                  <label htmlFor='' >Gender(optional)</label>
                </div>
                <div className='username'>
                  <div className='form-floating mt-2'>
                    <input type='text' className='form-control border-0' name='username' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} placeholder='username' />
                    <label htmlFor=''>username</label>
                  </div>
                  {
                    formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''
                  }
                </div>
                <div className='password'>
                  <div className='form-floating mt-2'>
                    <input type='password' className='form-control border-0' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' value={formik.values.password}/>
                    <label htmlFor=''>Password</label>
                  </div>
                  {
                    formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''
                  }
                </div>
                <div className='button mt-2'>
                  <button className="btn bgs text-center w-100 text-white fs-5" type='submit'>
                  {isGoing ? <div className="spinner-border text-white opacity-50" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> : 'Create Account'}
                    </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Adminsignup