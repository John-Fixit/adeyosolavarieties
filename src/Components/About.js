import React from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaPen } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
function About({title, type, description, name}) {
  const location = useLocation().pathname.split('/')
  return (
    <>
    <Helmet>
    <title>{title}</title>
        <meta name="description" content={description} />
        {/* End standard metadata tags */}
        {/* Facebook tags */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta name="twitter:creator" content={name} />
        <meta name="twitter:card" content={type} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
    </Helmet>
      <div className="col-12 cont_fluid">
        <h2 className="bgs text-center text-light py-2">
          About Adeyosola Ventures
        </h2>
        <div className="col-12 p-3 text-justify-end">
          Deals with affordable and quality unisex wears such as roundneck,
          polo, Jean, joggers, armless,gown, Jalab, abaya, lingeries... Also we
          sell interior decorations,kitchen equipments, electronic gadgets and
          lots more... @ Adeyosola Varieties 👑👸🏻 we offer the best, quality at
          the cheapest wholesale price...
        </div>
        <div className="p-3">
          <b className="textColor">
            Please Note... <FaPen />
          </b>
          <ul>
            <li>
              <i>No Refund</i>
            </li>
            <li>
              <i>No Return</i>
            </li>
            <li>
              <i>No Exchange</i>
            </li>
            <li>
              <i>_Paymenet Validate Order</i>
            </li>
          </ul>
        </div>
        {
         location[1]== "staff"?"": (location[1] == 'admin'? "":
        <Link
          to="/contact"
          className="button text-decoration-none btn bgs text-light mx-3 fw-bold arr_left"
        >
          Get in Touch <span className="arr_left"><FaArrowRight /></span>

        </Link>)
        }
      </div>
    </>
  );
}

export default About;
