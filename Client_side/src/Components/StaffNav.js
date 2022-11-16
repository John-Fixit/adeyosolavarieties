import React, {useEffect} from 'react'
import user from '../Images/user.PNG'
import { NavLink ,Link, useNavigate } from 'react-router-dom'
import { FaRegUser, FaStrikethrough } from 'react-icons/fa'
import adeLogo from '../Images/AdeyosolaVar.jpg'
import style from './style.css'
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
function StaffNav({ firstname, profilePhoto }) {
    useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
        .forEach(tooltipNode => new Tooltip(tooltipNode))
        });
    
        const navigate = useNavigate()
        const logOut = () => {
            if (window.confirm(`Are you sure to log out ?`)) {
                localStorage.removeItem('admintoken')
                localStorage.removeItem('adminInfo')
                navigate('/staff_login')
            }
           
        }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs border-0 border-bottom border-secondary border-3">
        <div className="container-fluid">
            <Link to='' className="navbar-brand fs-2 fw-bold text-light"><img src={adeLogo} alt='our logo' className='rounded-circle' width='60'/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ms-5" style={{ marginLeft: '6vh' }}>
                    <li className="nav-item ms-3">
                        <NavLink activeClassName="active" to='/staff/' className="nav-link fw-bold text-light " data-bs-toggle="tooltip" data-bs-placement="top" title="Admin Home">Home</NavLink>
                    </li>
                    <li className="nav-item ms-3">
                        <NavLink activeClassName="active" to='/staff/customers' className="nav-link fw-bold text-light" data-bs-toggle="tooltip" data-bs-placement="top" title="Staff list">Staff List</NavLink>
                    </li>
                    <li className="nav-item ms-3">
                        <NavLink activeClassName="active" to='/staff/addProduct' className="nav-link fw-bold text-light position-relative" data-bs-toggle="tooltip" data-bs-placement="top" title="Upload Product"> upload products </NavLink>
                    </li>
                </ul>
                <div className="nav-item dropdown ms-3">
                    <button type="button" className="border-0 bgs text-light" id='navbarDropdown' data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={ profilePhoto == '' ? user : profilePhoto} className='card-img-top rounded-circle' style={{ width: '7vh', height: '7vh' }} alt='profile Pic'/><span className='text-light'> Hi, {firstname!== ""? firstname : 'user'}</span>
                    </button>
                    <ul className="dropdown-menu text-light" aria-labelledby="navbarDropdown">
                        <li><NavLink activeClassName="active" to="/staff/profile" className="dropdown-item list"><FaRegUser /> Profile</NavLink></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="btn dropdown-item list" onClick={logOut}>Log out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</>
  )
}

export default StaffNav