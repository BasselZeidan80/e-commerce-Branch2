import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const mySchema = Yup.object({
  details: Yup.string().required("any data must be req!").min(3).max(20),
  city: Yup.string().required("name must be req!").min(3).max(20),
  phone: Yup.string()
    .required("Phone must be formated egyptian number!")
    .matches(/^01[0125][0-9]{8}$/),
});

export default function Payment() {
  const nav = useNavigate();
  const { CartID, getUserCart ,clearAllProducts } = useContext(CartContext);

  const userData = {
    details: "",
    city: "",
    phone: "",
  };

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: confirmCashPayment,
    validationSchema: mySchema,
    // validationSchema: mySchema,
  });

  function confirmCashPayment() {
    const shippingObj = {
      shippingAddress: {
        details: "",
        city: "",
        phone: "",
      },
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartID}`,
        shippingObj,
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log("res ", res);
        if (res.data.status === "success") {
          toast.success("payment completed successfully ");
          // getUserCart();

          clearAllProducts()



          setTimeout(() => {
            nav("/Products");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("error occured ");
      });
  }



  // finction online payment

  function confirmOnlinePayment() {
    const shippingObj = {
      shippingAddress: {
        details: "",
        city: "",
        phone: "",
      },
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}`,
        shippingObj,
        {
          headers: { token: localStorage.getItem("token") },
          params: {url : "http://localhost:3000"}
        }
      )
      .then((res) => {
        
        
        console.log("res ", res);
        if (res.data.status === "success") {
          // toast.success("payment completed successfully ");
          // getUserCart();
          
          window.open(res.data.session.url ,"_self")



        }
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("error occured ");
      });
  }




  // 
  return (
    <>
      <div className="w-50 mx-auto py-4 ">
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="city">city:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.city}
            type="text"
            className="form-control mb-3"
            id="city"
          />
          {myFormik.errors.city && myFormik.touched.city ? (
            <div className="alert alert-danger">{myFormik.errors.city}</div>
          ) : (
            ""
          )}

          <label htmlFor="city">phone:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            type="text"
            className="form-control mb-3"
            id="phone"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="details">details:</label>
          <textarea
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.details}
            type="text"
            className="form-control mb-3"
            id="details"
          />
          {myFormik.errors.details && myFormik.touched.details ? (
            <div className="alert alert-danger">{myFormik.errors.details}</div>
          ) : (
            ""
          )}

          <button
            type="submit"
            onClick={() => confirmCashPayment}
            className="btn btn-primary"
          >
            Confirm Cash Payment
          </button>

          <button
            type="submit"
            onClick={  confirmOnlinePayment}
            className="btn btn-primary"
          >
            Confirm Online Payment
          </button>
        </form>
      </div>
    </>
  );
}
