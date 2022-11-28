import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import style from './style.css'
function CustomerList({ staff, adminDetail }) {
  const deleteStaffURI = 'https://adeyosolavarieties.herokuapp.com/admin/deleteStaff'

  const staffDlt = ({ staffId }) => {
    if (adminDetail._id == staffId) {
      alert(`Please go to your profile page and follow the precautions to delete your account!`)
    }
    else {
      if (window.confirm(`Are you sure to delete this staff! because the staff data will be deleted permsnently from the database?`)) {
        axios.post(deleteStaffURI, { staffId }).then((res) => {
          if (res.data.status) {
            window.location.reload()
          } else {
            alert(`${res.data.message}`)
          }
        })
      }
    }
  }
  return (
    <div className='cont_fluid px-3 text-center'>

      <p className='card-header fs-4 text-center text-muted'>Registered Staff List</p>
      {
        staff.length < 1 ? <p >No staff yet</p> :
          <table className="table table-hover table-responsive">
            <thead className='text-center text-muted'>
              <th>S/N</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Username</th>
              <th>Role</th>
              <th>Registered By</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {
                staff.map((eachOne, index) => (
                  <tr key={index} className='text-center'>
                    <td>{index + 1}</td>
                    <td>{eachOne.firstname}</td>
                    <td>{eachOne.lastname}</td>
                    <td>{eachOne.email}</td>
                    <td>{eachOne.contact}</td>
                    <td>{eachOne.username}</td>
                    <td>{eachOne.role}</td>
                    <td>{eachOne.addedBy ? eachOne.addedBy : 'Not Registered'}</td>
                    <td><button className='btn btnbg text-white' onClick={() => staffDlt({ staffId: eachOne._id })}><FaTrashAlt /></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </div>
  )
}

export default CustomerList