import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Navbar.css';

function Navbar() {

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark custom-navbar"
    >

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          <i className="bi bi-buildings-fill"></i>

          &nbsp; Real Estate CRM
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">

              <Link
                className="nav-link"
                to="/"
              >
                Enquiry Form
              </Link>

            </li>

            <li className="nav-item">

              <Link
                className="nav-link"
                to="/dashboard"
              >
                Manager Dashboard
              </Link>

            </li>

            <li className="nav-item">

              <Link
                className="nav-link"
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>

            </li>

          </ul>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;