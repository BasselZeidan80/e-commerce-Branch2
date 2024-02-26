import React from "react";
import ntFoundImg from "../../images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="image w-50 m-auto mt-5">
          <img src={ntFoundImg} alt="error" className="w-100" />
        </div>
      </div>
    </>
  );
}
