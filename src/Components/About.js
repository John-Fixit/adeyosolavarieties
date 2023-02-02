import React from "react";
import { FaArrowRight, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./getInTouchBtn.css"
function About() {
  return (
    <>
      <div className="col-12 cont_fluid">
        <h2 className="btnbg text-center text-light py-2">
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
        <Link
          to="/contact"
          className="button text-decoration-none btn btnbg text-light mx-3 fw-bold arr_left"
        >
          Get in Touch <span className="arr_left"><FaArrowRight /></span>

        </Link>
      </div>
    </>
  );
}

export default About;
