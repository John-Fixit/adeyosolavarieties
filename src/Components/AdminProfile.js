import axios, { Axios } from 'axios'
import React, { useState, useEffect } from 'react'
import { FaCartArrowDown, FaCheck, FaPencilAlt, FaRegBookmark, FaRegUser, FaUserFriends } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
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

    const {data, error} = useSWR(`${baseUrl}/admin?qry=${paramsRouter._id}`, {refreshInterval: 1000})


    const profileURI = `${baseUrl}/admin/save`
    const PROFILEPHOTOURI = `${baseUrl}/admin/uploadProfilePhoto`
    const deleteAccURI = `${baseUrl}/admin/deleteAccount`
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [username, setusername] = useState('')
    const [gender, setgender] = useState('')
    const [disable, setdisable] = useState(true)
    const [dispp, setdispp] = useState(true)
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
    useEffect(() => {
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
    }
    const editProfile = () => {
        setdisable(false)
    }
    const selectPhoto = (e) => {
        const selectedPhoto = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectedPhoto)
        reader.onload = () => {
            setdispp(false)
            setconvertedFile(reader.result)
            console.log(convertedFile)
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
        const thisAdmin = { adminId, firstname, lastname, email, contact, username }
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
                            <FaCheck cursor={'pointer'} color={'navy'}/> : <FaPencilAlt cursor={'pointer'} color={'navy'}/> 
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
                            {/* <div className='row col-sm-12'>
                                <div className='col-sm-8'>
                                    <label htmlFor='' >profile photo</label>
                                    {isLoading ? '' :
                                        status ? '' : <p className={!disable ? 'alert alert-danger p-0 text-center d-none' : 'alert alert-danger p-0 text-center'}>{message}</p>
                                    }
                                    <input type='file' className='form-control border-0 border-bottom border-dark' id='avatarFile' placeholder='Upload' onChange={(e) => selectPhoto(e)} />
                                </div>
                                <div className='col-sm-4'>
                                    <button className='btn btnbg w-100 text-light py-3' onClick={savePhoto} disabled={dispp}>{isSavingPicture ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'Save Profile Picture'}</button>
                                </div>
                            </div> */}
                            <div className='card border-0 p-2'>
                                <h4 className='card-header'>Details</h4>
                                {isLoading ? '' :
                                    !status ? <p className={disable ? 'alert alert-danger d-none' : 'alert alert-danger'}>{message}</p> : ''
                                }
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' disabled={disable} placeholder='Firstname' value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                                        <label htmlFor='' >Firstname</label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' disabled={disable} placeholder='Lastname' value={lastname} onChange={(e) => setlastname(e.target.value)} />
                                        <label htmlFor='' >Lastname</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='email' className='form-control border-0' disabled={true} placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                                        <label htmlFor='' >Email Address : <span className='text-muted'>This field can not be edited for now</span></label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' disabled={disable} placeholder='phone' value={contact} onChange={(e) => setcontact(e.target.value)} />
                                        <label htmlFor='' >Phone Number(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6 form-floating'>
                                    <select className='form-control border-0' defaultValue={gender} disabled={disable} onChange={handleChange}>
                                            {
                                                options.map((option) => (
                                                    <option value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='' >Gender(optional)</label>
                                    </div>
                                    <div className='col-sm-6 form-floating'>
                                        <input type='text' className='form-control border-0' disabled={disable} value={username} placeholder='username' onChange={(e) => setusername(e.target.value)} />
                                        <label htmlFor='' >Username(optional)</label>
                                    </div>
                                </div>
                                <div className='row mt-3'>

                                </div>
                                <div className='row shadow mt-4 btn-group pb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-primary w-100' onClick={editProfile}>EDIT</button>
                                    </div>
                                    <div className='col-6 bgs rounded'>
                                        <button className='border-0 pt-2 w-100 bgs text-light' disabled={disable} onClick={saveProfile}>{isSaving ? <div className="spinner-border text-light opacity-50" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> : 'SAVE'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 shadow-sm'>
                            <div className='card h-100 p-2'>
                                <Link to='' className='text-decoration-none text-dark list'><FaRegUser size='3vh' className='textColor'/> My account</Link>
                                <hr />
                                <Link to='/admin/customers' className='text-decoration-none text-dark list'><FaUserFriends size='3vh' className='textColor'/> Staff List</Link>
                                <Link to='/admin/addProduct' className='text-decoration-none text-dark list mt-3'><FaCartArrowDown size='3vh' className='textColor'/> Add New Product</Link>
                                <Link to='/admin/signup' className='text-decoration-none text-dark list mt-3'><FaRegBookmark size='3vh' className='textColor'/> Add New Staff</Link>
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
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminProfile