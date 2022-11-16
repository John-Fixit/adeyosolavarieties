import React, { useState } from "react";
import style from "./style.css";
import axios from "axios";

function UploadProducts({ adminDetail }) {
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [rate, setrate] = useState("");
  const [convertedFile, setconvertedFile] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState(false);
  const [isGoing, setisGoing] = useState(false);
  const [uploadedTitle, setuploadedTitle] = useState('')
  const [uploadedRate, setuploadedRate] = useState('')
  const [uploadedPrice, setuploadedPrice] = useState('')
  const [uploadedImg, setuploadedImg] = useState('')
  const newProductURI = "https://adeyosolavarieties.herokuapp.com/admin/products";
  const selectProduct = (e) => {
    const selectedProduct = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedProduct);
    reader.onload = () => {
      setconvertedFile(() => {
        return reader.result;
      });
    };
  };
  const uploadProduct = () => {
    setisGoing(true);
    const fullname = adminDetail.firstname + " " + adminDetail.lastname;
    const email = adminDetail.email;
    const productInfo = { fullname, email, convertedFile, title, price, rate };
    axios.post(newProductURI, productInfo).then((res) => {
      setisLoading(false);
      setisGoing(false);
      if (res.data.status) {
        setstatus(res.data.status)
        setmessage(res.data.message);
        setuploadedImg(res.data.productDetail.image)
        setuploadedRate(res.data.productDetail.rating)
        setuploadedPrice(res.data.productDetail.price)
        setuploadedTitle(res.data.productDetail.title)
        settitle('')
        setrate('')
        setprice('')
      } else {
        setmessage(res.data.message);
        setstatus(res.data.status);
      }
    });
  };
  const okConfirm =()=>{
    window.location.reload()
  }

  return (
    <>
      <div className="products_row cont_fluid">
        <h2 className="card-header text-center pt-2">Add New Product</h2>
        <div className="row mt-2 ">
          <div className="col-lg-6">
            {isLoading ? (
              ""
            ) : status ? (
              <p className="alert alert-success text-center">{message}</p>
            ) : (
              <p className="alert alert-danger text-center">{message}</p>
            )}
            <div className="card p-2">
              <div className="mt-2">
                <label htmlFor="">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Title of The product"
                  onChange={(e) => selectProduct(e)}
                />
              </div>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title of The product"
                  onChange={(e) => settitle(e.target.value)}
                />
                <label htmlFor="">Title of the product</label>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-floating mt-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price of The product"
                      onChange={(e) => setprice(e.target.value)}
                    />
                    <label htmlFor="">Price of the product</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating mt-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rate of The product"
                      onChange={(e) => setrate(e.target.value)}
                    />
                    <label htmlFor="">Rate of the product</label>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <button
                  className="btn btnbg w-100 mt-3 text-light fs-5"
                  onClick={uploadProduct}
                >
                  {isGoing ? (
                    <div
                      className="spinner-border text-light opacity-50"
                      role="status"
                    >
                      <span className="visually-hidden">loading...</span>
                    </div>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className={isLoading? 'col-lg-6 d-none' : 'col-lg-6 d-block'}>
            <div className="card p-2 h-100 uploadedCard">
              <div className="row">
                <div className="mt-2 col-sm-6">
                  <p>Uploaded Product</p>
                  <img src={uploadedImg} alt="imgage uploading" className="card-img-top"></img>
                </div>
                <div className="col-sm-6">
                  <p>Product title: {uploadedTitle}</p>
                  <p>Price of the Product: {uploadedPrice}</p>
                  <p>Product rate: {uploadedRate} </p>
                </div>
                    <div className="button">
                      <button className="btn bgs" onClick={okConfirm}>OK</button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProducts;
