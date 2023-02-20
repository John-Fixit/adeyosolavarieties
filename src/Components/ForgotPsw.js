
import React, { useState } from "react";
import style from "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "./URL";
import Loader from "react-spinners/ClockLoader"
function ForgotPsw() {
  const [resMessage, setresMessage] = useState("")
  const [resStatus, setresStatus] = useState(undefined)
  const [isLoading, setisLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setisLoading(true)
      axios.post(`${baseUrl}/admin/forgotPsw`, values).then((res)=>{
        let {message, status} = res.data
        setresStatus(status)
        setresMessage(message)
     }).catch((err)=>{
        setresStatus(false)
        setresMessage(`${err.message}: Please check your connection!`)
     }).finally(()=>{
          setisLoading(false)
     })
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email must be provided to continue")
        .email("Please input a valid email"),
    }),
  });
  return (
    <>
      <div className="forgotPswContainer">
        <div className="row shadow rounded">
          <div className="">
            <div className="card h-100 border-0 form" style={{display: "flex", justifyContent: "center"}}>
              <form action="" onSubmit={formik.handleSubmit}>
                <h2 className="card-header text-center text-muted py-3">
                  Recover Password{" "}
                </h2>
                <div className="p-2">
                  <i>
                    Enter the email address of your
                    account. we'll send you a password reset email.
                  </i>
                </div>
                {
                  resStatus!=undefined &&
                <div className={`alert ${resStatus==false&&"alert-danger"} ${resStatus==true&&"alert-success"}`}>
                  <span >{resMessage}</span>
                </div>
                }
                <div className="email">
                  <div className="form-floating mt-4">
                    <input
                      type="text"
                      className="form-control border-0"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Email address"
                    />
                    <label htmlFor="">Email Address</label>
                  </div>
                  {formik.touched.email ? (
                    <small className="text-danger ms-3">
                      {formik.errors.email}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
                <div className="my-3">
                  {
                  resStatus!=undefined &&
                  <i>Do not get any link? <Link to={''} onClick={()=>formik.handleSubmit({email: formik.values.email})}>Resend</Link></i>
                }
                </div>
                <div className="my-3">
                    <i>Remebered your password? <Link to={'/admin_login'} >Login</Link></i>
                </div>
                <div className="m-4">
                  {
                      isLoading?
                      <Loader loading={isLoading} color={"orangered"} size={25} cssOverride={{margin: "0 auto"}}/>:
                      <button type="submit" className="btn bgs rounded-pill w-100">NEXT</button>
                  }
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPsw;
