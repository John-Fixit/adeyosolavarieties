import axios, { Axios } from 'axios'
import React, { useState, useEffect } from 'react'
import { FaCartArrowDown, FaCheck, FaPencilAlt, FaRegBookmark, FaRegUser, FaUserFriends } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import user from '../Images/user.PNG'
import style from './style.css'
import { baseUrl } from './URL'
import { useParams } from 'react-router-dom'
import useSWR from "swr"
import Loader from 'react-spinners/ClockLoader'
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function AdminProfile() {

    const paramsRouter = useParams()
    const location = useLocation()
    const locationRole = location.pathname.split('/')
    const {data, error} = useSWR(`${baseUrl}/admin?qry=${paramsRouter._id}`)

    const profileURI = `${baseUrl}/admin/save`
    const PROFILEPHOTOURI = `${baseUrl}/admin/uploadProfilePhoto`
    const deleteAccURI = `${baseUrl}/admin/deleteAccount`
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [adminId, setadminId] = useState('')
    const [convertedFile, setconvertedFile] = useState('')
    const [message, setmessage] = useState('')
    const [status, setstatus] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [isGoing, setisGoing] = useState(false)
    const [isSaving, setisSaving] = useState(false)
    const [isSavingPicture, setisSavingPicture] = useState(false)
    const [disBtn, setdisBtn] = useState(true)
    const [understand, setunderstand] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        setfirstname(data?.data.result.firstname)
        setlastname(data?.data.result.lastname)
        setemail(data?.data.result.email)
        setcontact(data?.data.result.contact)
        setusername(data?.data.result.username)
        setadminId(data?.data.result._id)
        setgender(data?.data.result.gender)
    }, [data])

    const options = [gender, 'male', 'female']
    const handleChange = (e) => {
            setgender(e.target.value)
            console.log(e.target.value)
    }
    const selectPhoto = (e) => {
        const selectedPhoto = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedPhoto)
        reader.onload = () => {
            setconvertedFile(reader.result)
        }
    }
    const savePhoto = () => {
        setisSavingPicture(true)
        axios.post(PROFILEPHOTOURI, { convertedFile, adminId }).then((res) => {
            setisSavingPicture(false)
            setisLoading(false)
            if (res.data.status) {
                window.location.reload()
            } else {
                setmessage(() => { return res.data.message })
                setstatus(() => { return res.data.status })
            }
        })
    }

    const saveProfile = () => {
        setisSaving(true)
        const thisAdmin = { adminId, firstname, lastname, email, contact, username, gender }
        axios.post(profileURI, thisAdmin).then((res) => {
            setisSaving(false)
            setisLoading(false)
            if (res.data.status) {
                window.location.reload()
            }
            else {
                setmessage(() => { return res.data.message })
                setstatus(() => { return res.data.status })
            }
        }).catch((err)=>{
            toast.error(err.message, {position: "top-center", theme: "colored"})
        })
    }
    const closeModal = () => {
        setisGoing(false)
        setunderstand(false)
    }
    const deleteAccount = () => {
        setisGoing(true)
        axios.post(deleteAccURI, { adminId }).then((res) => {
            setisGoing(false)
            if (res.data.status) {
                navigate('/admin_login')
            }
            else {
                toast.error(res.data.message, {position: "top-center", theme: "colored"})
                
            }
        })
    }

    const tama = () => {
        setdisBtn(false)
        setunderstand(true)
    }
    return (
        <>
            <div className='container-fluid cont_fluid bg-light pt-2'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-lg-9 shadow-sm'>
                            <label htmlFor='avatarFile' className=''>
                        <img src={ data?.data.result.profilePhoto == '' ? user : data?.data.result.profilePhoto} className='card-img-top rounded-circle' style={{ width: '12vh', height: '12vh' }} alt="profilepics"/>
                        {
                            isSavingPicture? <Loader loading={isSavingPicture} size={15} color={"navy"}/>:
                            !!convertedFile? 
                            <FaCheck cursor={'pointer'} color={'navy'} data-bs-target="tooltip" title="File selected or choose new file"/> : <FaPencilAlt cursor={'pointer'} color={'navy'} data-bs-target="tooltip" title="Choose a file to upload"/> 
                        }
                                    <input type='file' className='form-control border-0 border-bottom border-dark d-none' id='avatarFile' placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                            </label>
                            <div >
                            {
                                        !!convertedFile? 
                                        <button className='btn btn-danger btn-sm' onClick={savePhoto}>Upload</button>:
                                        ""
                            }

                            </div>
                           
                            <div className='card border-0 p-2'>
                                <h4 className='card-header'>Details</h4>
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floatin'>
                                        <span className=''>First Name</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.firstname}</p>
                                       
                                    </div>
                                    <div className='col-sm-6 form-floatin'>
                                    <span className=''>Last Name</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.lastname}</p>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                    <span className=''>Email Address</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.email}</p>
                                    </div>
                                    <div className='col-sm-6 '>
                                    <span className=''>Phone Number</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.contact}</p>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                    <span className=''>Gender</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.gender}</p>
                                    </div>
                                    <div className='col-sm-6'>
                                    <span className=''>Username</span>
                                        <p className='border-bottom p-2 fw-bold'>{data?.data.result.username}</p>
                                    </div>
                                </div>
                                
                                <div className='mt-3 ms-auto pb-3'>
                                        <button className='btn btn-primary ms-auto' data-bs-toggle="modal" data-bs-target="#editModal" ><FaPencilAlt /> EDIT</button>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 shadow-sm'>
                            <div className='card h-100 p-2'>
                                <Link to='' className='text-decoration-none text-dark list'><FaRegUser size='3vh' className='textColor'/> My Profile</Link>
                                <hr />
                                <Link to={`/${locationRole[1]}/addProduct`} className='text-decoration-none text-dark list mt-3'><FaCartArrowDown size='3vh' className='textColor'/> Add New Product</Link>
                                {
                                    !locationRole[1] == "staff"&&
                                    <div >
                                        <Link to='/admin/customers' className='text-decoration-none text-dark list'><FaUserFriends size='3vh' className='textColor'/> Staff List</Link>
                                        <Link to='/admin/signup' className='text-decoration-none text-dark list mt-3'><FaRegBookmark size='3vh' className='textColor'/> Add New Staff</Link>
                                    </div>
                                }
                                <button className='rounded col-9 mt-3 btn-outline-danger' data-bs-toggle="modal" data-bs-target="#exampleModal" data-backdrop="false">Delete account</button>

                                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h6 className="modal-title mx-auto text-danger" id="exampleModalLabel">WARNING! WARNING!! WARNING!!!</h6>
                                            </div>
                                            <div className="modal-body">
                                                <p className='text-danger'><b >Notice : </b>If you <b>proceed</b> this aspect, this account will be permanently deleted from JFIX e-commerce site. And all your data will be also be discarded here!</p>
                                            </div>
                                            <div className='col-sm-4 ms-3'>
                                                <button className='btn btn-warning' onClick={tama} disabled={understand}>I understand you</button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                                                <button type="button" className="btn btnbg text-light" data-bs-dismiss="modal" disabled={disBtn} onClick={deleteAccount}>{isGoing ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'Proceed and Delete'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    
                        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            
                              </div>
                              <div class="modal-body">
                              <div className='card border-0 p-2'>
                                <div className='alert alert-warning'>
                                <span className='text-muted'>NOTE: Please EMAIL ADDRESS can not be edited for now, we are sorry for any inconvenient!</span>
                                </div>
                                <h4 className='card-header'>Details</h4>
                                {isLoading ? '' :
                                    !status ? <p className={'alert alert-danger'}>{message}</p> : ''
                                }
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' placeholder='Firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                                        <label htmlFor='' >Firstname</label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' placeholder='Lastname' value={lastname} onChange={(e) => setlastname(e.target.value)} />
                                        <label htmlFor='' >Lastname</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='email' className='form-control border-0' disabled={true} placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                                        <label htmlFor='' >Email Address</label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' placeholder='phone' value={contact} onChange={(e) => setcontact(e.target.value)} />
                                        <label htmlFor='' >Phone Number</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                    <select className='form-control border-0' defaultValue={gender} onChange={handleChange}>
                                            {
                                                options.map((option, i) => (
                                                    <option value={option} key={i}>{option}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='' >Gender</label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' value={username} placeholder='username' onChange={(e) => setusername(e.target.value)} />
                                        <label htmlFor='' >Username(optional)</label>
                                    </div>
                                </div>
                                
                            </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn border-0 pt-2 bgs text-light" onClick={saveProfile}>{isSaving ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'SAVE'}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminProfile