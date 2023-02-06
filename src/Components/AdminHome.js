import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./style.css";
import img1 from "../Images/business.png";
import img2 from "../Images/printing.png";
import img4 from "../Images/sticker.png";
import img5 from "../Images/christmas.png";
import img7 from "../Images/1473159158_Christmas-card-for-this-wonderful-season.png";
import ReactPaginate from "react-paginate";
import AOS from "aos";
import "aos/dist/aos.css";
import CurrencyFormat from "react-currency-format"
import {
  FaCartPlus,
  FaEdit,
  FaTrashAlt,
  FaUserAstronaut,
} from "react-icons/fa";
import { baseUrl } from "./URL";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr"
import Loader from "react-spinners/HashLoader";
import Skeleton from "react-skeleton"


const fetcher = (...args)=> axios.get(...args)
function AdminHome({ staff }) {

  const {data, error} = useSWR(`${baseUrl}/user/products`, fetcher, {refreshInterval: 1000})

  const deleteProductURI = `${baseUrl}/admin/deleteProduct`;
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState(true);
  const [productToDelete, setproductToDelete] = useState("");
  const [productId, setproductId] = useState("");
  const [isComing, setisComing] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [editTitle, seteditTitle] = useState("");
  const [editRate, seteditRate] = useState("");
  const [editPrice, seteditPrice] = useState("");
  const [editId, seteditId] = useState("");
  const productPerPage = 12;
  const productDisplayed = productPerPage * pageNumber;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const modalOut = (productDetail) => {
    setproductToDelete(() => {
      return productDetail.productTitle;
    });
    setproductId(productDetail.productId);
  };
  const handleOnChange = (e) => {
    if (productToDelete == e.target.value) {
      setisComing(false);
    } else {
      setisComing(true);
    }
  };
  const deleteProduct = () => {
    axios.post(deleteProductURI, { productId }).then((res) => {
      if (res.data.status) {
        window.location.reload();
      } else {
        setmessage(res.data.message);
        setstatus(res.data.status);
      }
    });
  };
  const modalEditOut = (thisProduct) => {
    seteditTitle(thisProduct.Title);
    seteditPrice(thisProduct.Price);
    seteditRate(thisProduct.Rate);
    seteditId(thisProduct.Id);
  };  

  const displayProducts = data?.data.result
    .slice(productDisplayed, productDisplayed + productPerPage)
    .map((eachProduct, index) => (
      <div className="col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
        <div className="card shadow-lg p-2 h-100">
          <img
            src={eachProduct.image}
            className="card-img-top mx-auto shadow w-75"
            alt="product"
          />
          <div className="card-body">
            <h6 className="card-title text-start">{eachProduct.title}</h6>
            <p className="card-text text-start">
              Price : <CurrencyFormat value={eachProduct.price} thousandSeparator={true} displayType={"text"} prefix={"NGN "}/>
            </p>
            <p className="rate">RATE: {eachProduct.rating}</p>
          </div>
          <div className="card-footer btn-group">
            <button
              type="button"
              className="btn btnbg text-light w-100 btnHover"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() =>
                modalOut({
                  productId: eachProduct._id,
                  productTitle: eachProduct.title,
                })
              }
            >
              <FaTrashAlt size="3vh" />
              <small> Delete</small>
            </button>
            <button
              type="button"
              className="btn btnbg text-light w-100 btnHover"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              onClick={() =>
                modalEditOut({
                  Id: eachProduct._id,
                  Title: eachProduct.title,
                  Rate: eachProduct.rating,
                  Price: eachProduct.price,
                })
              }
            >
              <FaEdit size="3vh" />
              <small> Edit</small>
            </button>
          </div>
          <div className="btn-group"></div>
        </div>
      </div>
    ));

  const countPage = Math.ceil(data?.data.result.length / productPerPage);
  const changePage = ({ nextOne }) => {
    setPageNumber(nextOne);
  };
  const saveChanges=()=>{
    const productChanges = {editTitle, editPrice, editRate, editId}
    axios.post(`${baseUrl}/admin/editProduct`, productChanges).then((data)=>{
      if(data.data.status){
        window.location.reload()
      }else{
        toast.error(data.data.message)
      }
    }).catch((err)=>{
      toast.error(err.message)     
    })
  }
  return (
    <>
      <div className="container-fluid cont_fluid">
        {/* <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item">
              <div className="d-flex">
                <img src={img1} className="d-block" width="25%" alt="..." />
                <img src={img2} className="d-block" width="25%" alt="..." />
                <img src={img5} className="d-block" width="25%" alt="..." />
                <img src={img4} className="d-block" width="25%" alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex">
                <img src={img5} className="d-block " width="25%" alt="..." />
                <img src={img1} className="d-block " width="25%" alt="..." />
                <img src={img2} className="d-block " width="25%" alt="..." />
                <img src={img7} className="d-block " width="25%" alt="..." />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5></h5>
                <p></p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex">
                <img src={img4} className="d-block" width="25%" alt="..." />
                <img src={img7} className="d-block" width="25%" alt="..." />
                <img src={img1} className="d-block" width="25%" alt="..." />
                <img src={img2} className="d-block" width="25%" alt="..." />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}




        <div className="col-sm-12 products_row">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-3">
              <div className="card shadow h-100 btnbg rounded p-3 text-white">
                <FaUserAstronaut size="4vh" className="mx-auto" />
                <h3 className="card-title">
                  Total Staff (s) :{" "}
                  <span className="small_tex">{staff.length}</span>
                </h3>
                <div className="progress mt-3">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated ps-1 pe-3"
                    role="progressbar"
                    style={{ width: `${staff.length}%`, backgroundColor: '#060537' }}
                  >
                    {staff.length}%
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mt-3 ">
              <div className="card shadow h-100 p-3 textColor">
                <FaCartPlus size="4vh" className="mx-auto" />
                <h3 className="card-title">
                  Total Product (s) :{" "}
                  <span className="">{data?.data.result.length}</span>
                </h3>
                <div className="progress mt-3">
                  <div
                    className="progress-bar progress-bar-striped bgs progress-bar-animated ps-1 pe-3"
                    role="progressbar"
                    style={{ width: `${data?.data.result.length}%` }}
                  >
                    {data?.data.result.length} %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        {!data?
        [1, 2, 3,2, 2 ,3].map((_)=>{
          return <div className="col-lg-3 col-md-6 col-sm-12 mt-3" >
    <div className="card shadow-lg p-2 h-100">
    <Skeleton type="thumbnail" height={150} className="card-img-top"/>
    
      <div className="card-body">
        <h6 className="card-title text-start">
<Skeleton type="text-lg" width={280}/>
        </h6>
        <p className="card-text text-start">
        <Skeleton type="text-lg" width={200}/>
        </p>
        <p className="rate">
        <Skeleton type="text-md" width={180}/>
        </p>
      </div>
      <div className="card-footer justify-content-between d-flex ">
        <Skeleton width={`100%`} height={45}/>
      </div>
      <div className="btn-group"></div>
    </div>
  </div>
        })
        : (
          <div className="col-sm-12 products_row">
            <p className="bgs p-2 fs-5 text-light text-center rounded-3">
            Products available in the store
            </p>
            <div className="row">
              {displayProducts}
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={countPage}
                onPageChange={changePage}
                containerClassName={"paginateBtns"}
                activeClassName={"paginateActive"}
              />
            </div>
          </div>
        )}
</div>

        {status ? (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title mx-auto" id="exampleModalLabel">
                    Are you absolutely sure to delete this product
                  </h6>
                </div>
                <div className="modal-body">
                  <label htmlFor="">
                    Please type <b>{productToDelete}</b> to comfirm
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={
                      isComing
                        ? "btn btnbg disabled text-light"
                        : "btn btnbg  text-light"
                    }
                    data-bs-dismiss="modal"
                    onClick={deleteProduct}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="alert alert-danger">{message}</p>
        )}

        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title mx-auto" id="exampleModalLabel">
                  Edit {productToDelete} product
                </h6>
              </div>
              <div className="modal-body">
                <label htmlFor="Product Name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTitle}
                  onChange={(e) => {
                    seteditTitle(e.target.value);
                  }}
                />
                <label htmlFor="Product Name">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={editPrice}
                  onChange={(e) => {
                    seteditPrice(e.target.value);
                  }}
                />
                <label htmlFor="Product Name">Product Rate</label>
                <input
                  type="text"
                  className="form-control"
                  value={editRate}
                  onChange={(e) => {
                    seteditRate(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btnbg text-light"
                  data-bs-dismiss='modal'
                  onClick={saveChanges}
                >
                  Save Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminHome;
