import React from "react";
import "./Footer.css";
import imgs from "../../images/freshcart-logo.svg";
export default function Footer() {
  return (
    <>
      <div className="footer ">
        <div className="container ">
          <h3>Get The FreshCart app</h3>
          <p>
            we will send you a link , open it your phone to download the app{" "}
          </p>

          <div className="inparea w-100 d-flex justify-content-center  ">
            <input
              type="email"
              placeholder="Email.."
              className="form-control"
            />
            <button className="btn btn-success w-25 ">Share App Link</button>
          </div>
          <hr />
          <div className="paymentArea d-flex align-items-center">
            <div className="first d-flex  align-items-center   ">
              <p>Payment Partners</p>
              <img src={imgs} alt="icon" className="w-25" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
