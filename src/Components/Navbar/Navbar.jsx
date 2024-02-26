import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import "./Navbar.css";
import { AuthContextProvider } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
export default function Navbar() {
  
const {token , setToken} = useContext(AuthContextProvider)
 const {numOfCart} =  useContext(CartContext)
const Navigate =useNavigate()
function logoutFunction(){

  setToken(null)
  localStorage.removeItem('token')
  Navigate('/Login')
}
// console.log("token in navbar" , token);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh logo" />
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
            {token? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home 
                
                </Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" to="/Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Brand">
                  Brand
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AllOrders">
                  AllOrders
                </Link>
              </li>
             
            </ul> : ""}
           
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center cstIcons ">
            <li className="nav-item position-relative">
                <Link className="nav-link " to="/Cart">
                <i class="fa-solid fa-cart-shopping "></i>
                <span class="position-absolute top-0 end-50 translate-middle badge rounded-pill bg-danger">
                    {numOfCart? numOfCart : ""}
                  </span>
                </Link>
              </li>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-twitter"></i>

              {token? <li className="nav-item">
                <button onClick={logoutFunction} className="nav-link" >
                  Logout
                </button>
              </li>: <>
              
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Signup">
                  Signup
                </Link>
              </li>
              </>}
             
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
