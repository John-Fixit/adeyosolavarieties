import React, {useEffect, useState} from "react";
import adeLogo from "../Images/AdeyosolaVar.jpg";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'

function LandingNav() {
    useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
        .forEach(tooltipNode => new Tooltip(tooltipNode))
        });
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top padding_nav bgs border-0 border-bottom border-secondary border-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-2 fw-bold " >
            <img
              src={adeLogo}
              alt="logo"
              className="rounded-circle"
              width="60"
              data-bs-toggle="tooltip" data-bs-placement="top" title="Adeyosola ventures"/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
            >
              <li className="nav-item ms-5">
                <NavLink activeClassName="active" to="/" className="nav-link " data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink activeClassName="active" to="/about" className="nav-link " data-bs-toggle="tooltip" data-bs-placement="top" title="About us">
                  About us
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink activeClassName="active" to="/contact" className="nav-link " data-bs-toggle="tooltip" data-bs-placement="top" title="Contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LandingNav;
