
import React, {useRef, useState} from "react";
import style from "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "./URL";
import { useParams } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
//toastify css file here*
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-spinners/BarLoader"

function ResetPsw() {
  const [isLoading, setisLoading] = useState(false)
  const [resStatus, setresStatus] = useState(true)
    const paramsRouter = useParams()
  const ref = useRef()
    const toastOption = {position: "top-center", pauseOnHover: true, theme: "colored", autoClose: 8000, closeButton: true}
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async(values) => {
      setisLoading(true)
       axios.get(`${baseUrl}/admin/resetPsw?resetLink=${paramsRouter?.resetToken}&password=${values.password}`).then((res)=>{
        const {message, status} = res.data
        setresStatus(status)
        status? toast.success(message, toastOption): toast.error(message, toastOption)
              
       }).catch((err)=>{
            toast.error(err.message, toastOption)
       }).finally(()=>{
        setisLoading(false)
       })
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("Provide your new password!").min(6, "Password must not less than 6 characters")
    }),
  });
  return (
    <>
      <div className="forgotPswContainer p-sm">
          <div className="rounded" style={{border: "5px solid orangered"}}>
            <div className="card h-100 border-0 form" style={{display: "flex", justifyContent: "center"}}>
              <form action="" onSubmit={formik.handleSubmit}>
                <h2 className="card-header text-center text-muted py-3">
                  Create Your New Password
                </h2>
                <Loader loading={isLoading} cssOverride={{width: "100%"}} color={"orangered"}/>
                <div className="tex p-2">
                  <i>
                   You are about to recover your account, CREATE your new password
                  </i>
                </div>
                <div className="password">
                  <div className="form-floating mt-4">
                    <input
                      type="password"
                      className="form-control border-0"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="password"
                    />
                    <label htmlFor="">New Password</label>
                  </div>
                  {formik.touched.password ? (
                    <small className="text-danger ms-3">
                      {formik.errors.password}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-12 row my-3">
                  {
                    resStatus?
                    <i>Password updated? <Link to={'/admin_login'} >LOGIN</Link></i>:
                    <i>Get new LINK? <Link to={'/recov_email'} >GET LINK</Link></i>
                  }
                </div>
        
                <div className="m-4">
                <button type="submit" className="btn btnbg rounded-pill w-100">CREATE</button>
                </div>

              </form>
            </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ResetPsw;
