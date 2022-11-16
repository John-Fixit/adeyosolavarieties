import React, { useState } from "react";
import { useFormik } from "formik";
import style from "./style.css";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowAltCircleLeft} from "react-icons/fa";

function Contact() {
  const contactURI = "https://adeyosolavarieties.herokuapp.com/user/contact";
  const [status, setstatus] = useState(false);
  const [message, setmessage] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [isGoing, setisGoing] = useState(false);


  const formik = useFormik({
    initialValues: {
      senderName: "",
      senderEmail: "",
      senderAddress: "",
      senderTitle: "",
      senderMessage: "",
    },
    onSubmit: (values) => {
      setisGoing(true);
      axios.post(contactURI, values).then((res) => {
        setisLoading(false);
        formik.values.senderName = "";
        formik.values.senderEmail = "";
        formik.values.senderAddress = "";
        formik.values.senderTitle = "";
        formik.values.senderMessage = "";
        setisGoing(false);
        setmessage(res.data.message);
        setstatus(res.data.status);
      });
    },
    validationSchema: yup.object({
      senderName: yup.string().required("This field is Required"),
      senderEmail: yup
        .string()
        .required("This field is Required")
        .email("Please enter a valid email"),
      senderAddress: yup.string().required("This field is Required"),
      senderTitle: yup.string().required("This field is Required"),
      senderMessage: yup.string().required("This field is Required"),
    }),
  });
  return (
    <>
   
      <div className="col-12 cont_fluid">
        <h2 className="btnbg text-center text-light py-2">
          Contact Adeyodola Varieties
        </h2>
        <div className="container mt-2">
          {isLoading ? (
            ""
          ) : status ? (
            <p className="alert alert-success text-center pt-3">{message}</p>
          ) : (
            <p className="alert alert-danger text-center pt-3">{message}</p>
          )}
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-sm-6 mt-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="senderName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.senderName}
                  />
                  <label htmlFor="">Name</label>
                </div>
                {formik.touched.senderName ? (
                  <small className="text-danger ms-3">
                    {formik.errors.senderName}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="senderEmail"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.senderEmail}
                  />
                  <label htmlFor="">Email</label>
                </div>
                {formik.touched.senderEmail ? (
                  <small className="text-danger ms-3">
                    {formik.errors.senderEmail}
                  </small>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 mt-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="senderAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.senderAddress}
                  />
                  <label htmlFor="">Address</label>
                </div>
                {formik.touched.senderAddress ? (
                  <small className="text-danger ms-3">
                    {formik.errors.senderAddress}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="senderTitle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.senderTitle}
                  />
                  <label htmlFor="">Title</label>
                </div>
                {formik.touched.senderTitle ? (
                  <small className="text-danger ms-3">
                    {formik.errors.senderTitle}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="col-12 mt-3">
                <textarea
                  cols="10"
                  rows="10"
                  className="form-control"
                  placeholder="Message"
                  name="senderMessage"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.senderMessage}
                ></textarea>
                <button
                  className="btn btnbg mt-3 text-light p-2 float-end"
                  type="submit"
                >
                  {isGoing ? (
                    <div className="spinner-border text-white" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
            <Link
              to="/homepage"
              className="text-decoration-none border p-2 rounded-3 btnbg text-white"
            >
              <FaArrowAltCircleLeft /> Go to Home
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
