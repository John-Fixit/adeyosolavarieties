import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.css";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../Images/bgImg1.jpg";
import img2 from "../Images/bgImg2.jpg";
import img3 from "../Images/bgImg3.jpg";
import ReactPaginate from "react-paginate";
import Typewriter from "typewriter-effect";
import { baseUrl } from "./URL";
import Skeleton from "react-skeleton";
import CurrencyFormat from "react-currency-format"
import useSWR from "swr";
function LandingPage() {
  const { data, error } = useSWR(`${baseUrl}/user/products`);
  const [pageNumber, setpageNumber] = useState(0);
  const [t, sett] = useState(false)
  const productPerPage = 12;
  const productDisplayed = productPerPage * pageNumber;
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const getInTouch = (productTitle) => {
    window.location.href = `https://wa.me/+2348137513395?text= I found ${productTitle} from your site and wanted to purchase it`;
  };

  const displayProduct = data?.data.result
    .slice(productDisplayed, productDisplayed + productPerPage)
    .map((eachProduct, index) => (
      <div
        className="col-lg-3 col-md-6 col-sm-12 mt-3 card-col"
        data-aos="fade-down"
        key={index}
      >
        <div className="card shadow p-2 h-100">
          <img
            src={eachProduct.image}
            className={`card-img-top  mx-auto shadow w-75`}
            alt="products"
          />
          <div className="card-body">
            <h6 className="card-title text-start">{eachProduct.title}</h6>
            <p className="rate">RATE: {eachProduct.rating}</p>
            <p className="card-text text-start">
              Price : <CurrencyFormat value={eachProduct.price} thousandSeparator={true} displayType={"text"} prefix={"NGN "}/> <span>per product</span>
            </p>
          
          </div>
          <div className={`card-footer`}>
            <button
              type="button"
              className="btn bgs btnHover text-light w-100"
              onClick={() => getInTouch(eachProduct.title)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    ));
  const countPage = Math.ceil(data?.data.result.length / productPerPage);

  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  return (
    <>
      <div className="container-fluid cont_fluid">
        <div className="products_row">
          <div className="landingpageText col-12">
            <p className="card-body col-lg-7 col-md-12 fw-bold">
              <Typewriter
                options={{
                  strings: `Get your product online, it's fast and good to use. With this
    simple store site, you can purchase products of your choice. We
    offer good and quality product.`,
                  autoStart: true,
                  loop: true,
                }}
              />
              <a
                href="https://wa.me/+2348137513395"
                className="card-title text-decoration-none"
              >
                Click Here to get in Touch with the seller
              </a>{" "}
              and Enjoy us
            </p>
          </div>
        </div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex">
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex">
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-flex">
                <img src={img3} className="d-block w-25" alt="..." />
                <img src={img1} className="d-block w-25" alt="..." />
                <img src={img2} className="d-block w-25" alt="..." />
                <img src={img3} className="d-block w-25" alt="..." />
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
        </div>
        <div className="col-sm-12 products_row">
          <p className="bgs rounded-pill px-2 fs-5 text-light text-center">
            <Typewriter
              options={{
                strings: `Get in touch with adeyosola varieties on whatsapp for your
  interested products`,
                autoStart: true,
              }}
            />
          </p>
          <div className="row">
            <p className="card-header text-center text-muted fs-5">
              {data?.data.result.length ? "Product Available" : ""}
            </p>

            {!data? (
              Array(8).fill('skeleton').map((_) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-12 mt-3">
                    <div className="card shadow-lg p-2 h-100">
                      <Skeleton
                        type="thumbnail"
                        height={200}
                        className="card-img-top"
                      />

                      <div className="card-body">
                        <h6 className="card-title text-start">
                          <Skeleton type="text-lg" width={250} />
                        </h6>
                        <p className="card-text text-start">
                          <Skeleton type="text-lg" width={200} />
                        </p>
                        <p className="rate">
                          <Skeleton type="text-md" width={180} />
                        </p>
                      </div>
                      <div className="card-footer">
                        <Skeleton width={`100%`} height={45} />
                      </div>
                     
                    </div>
                  </div>
                );
              })
            ) : 
              <div className="">
                {data?.data.result.length ? (
                  <div className="row">
                    {displayProduct}
                    <ReactPaginate
                      previousLabel={<span aria-hidden="true" className="fw-bold">&laquo;</span>}
                      nextLabel={<span aria-hidden="true" className="fw-bold">&raquo;</span>}
                      pageCount={countPage}
                      onPageChange={changePage}
                      containerClassName={"paginateBtns"}
                      activeClassName={"paginateActive"}
                    />
                  </div>
                ) : (
                  <div className="text-center my-auto">
                    <h3>No Product Available</h3>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/message/U27MOKYLZN6NC1"
        className="btn bg-success mb-2 rounded-pill px-3 text-light py-1 position-fixed end-0"
        style={{ bottom: "4vh" }}
      >
        <FaWhatsapp size="3.5vh" /> Chat with us
      </a>
     <Link to={'/admin_login'}>Admin SignIn</Link><br/>
     <Link to={'/staff_login'}>Staff SignIn</Link>
    </>
  );
}

export default LandingPage;
