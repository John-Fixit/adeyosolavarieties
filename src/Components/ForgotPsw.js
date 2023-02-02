
import React from "react";
import style from "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "./URL";
function ForgotPsw() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async(values) => {
        let res = await axios.post(`${baseUrl}/admin/forgotPsw`, values)
        let data = await res.data
        console.log(data)
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
      <div className="forgotPswContainer p-sm">
        <div className="row shadow p-3 rounded">
          <div className="col-sm-6 card h-100 bgs text-center p-sm-5 rounded-3">
            <div className="adminLog">
              <div className="py-4">
                <h1 className="fw-bold">FORGOTTEN PASSWORD</h1>
                <p className="fw-bold">
                  Recover your password and login with ease
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card h-100 border-0 form" style={{display: "flex", justifyContent: "center"}}>
              <form action="" onSubmit={formik.handleSubmit}>
                <h2 className="card-header text-center text-muted py-3">
                  Recover Password{" "}
                </h2>
                <div className="tex p-2">
                  <i>
                    Enter the email address of your
                    account. we'll send you a password reset email.
                  </i>
                </div>
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
                <div className="col-12 my-3">
                    <i>Remebered your password? <Link to={'/admin_login'} >Login</Link></i>
                </div>
                <div className="m-4">
                <button type="submit" className="btn btnbg rounded-pill w-100">NEXT</button>
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
