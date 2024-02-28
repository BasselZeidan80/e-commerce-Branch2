import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import "./Cart.css";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";
import CartEmpty from "../CartEmpty/CartEmpty";
import { Link } from "react-router-dom";
export default function Cart() {
  const {
    addProductToCart,
    numOfCart,
    totalCartPrice,
    allProducts,
    updateProduct,
    deleteProduct,
    clearAllProducts,
  } = useContext(CartContext);
  console.log(allProducts);

  if (!allProducts) {
    return (
      <div className="d-flex vh-100 bg-opacity-50 justify-content-center align-items-center">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  function updateMyProduct(id, newCount) {
    const res = updateProduct(id, newCount);
    if (res) {
      toast.success("Updated successfully", { position: "top-center" });
    } else {
      toast.error("error try again later", { position: "top-center" });
    }
  }

  async function deleteMyProduct(id) {
    const res = await deleteProduct(id);
    if (res) {
      toast.success("removed successfully", { position: "top-center" });
    } else {
      toast.error("error try again later", { position: "top-center" });
    }
  }




  async function clearMyProducts() {
    const res = await clearAllProducts();
    if (res) {
      toast.success(" All removed successfully", { position: "top-center" });
    } else {
      toast.error("error try again later", { position: "top-center" });
    }
  }

  return (
    <>
      {allProducts.length ? (
        <div className="container position-relative">
          <h2 className="mt-4">Shop Cart</h2>
          <p className="CSTPRICE">Total Cart Price: {totalCartPrice} LE</p>

          <div className="cstBtn mb-3">
            <button
              onClick={() => clearMyProducts()}
              className="btn btnClear btn-outline-danger "
            >
              Clear All
            </button>

            <Link to={"/Payment"}>
              <button className="btnConfirm   ">Confirm Payment</button>
            </Link>
          </div>
          {allProducts?.map((product, idx) => (
            <div key={idx} className="row PRDDESIGN align-items-center  p-3">
              <div className="col-1">
                <figure>
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt={product.title}
                  />
                </figure>
              </div>
              <div className="col-9">
                <h4>{product.product.title}</h4>
                <p className="text-success fw-bold">
                  price: {product.price} LE
                </p>
                <button
                  onClick={() => deleteMyProduct(product.product.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
              <div className="col-2">
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    onClick={() =>
                      updateMyProduct(product.product.id, product.count + 1)
                    }
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <p>{product.count}</p>
                  <button
                    disabled={product.count == 1}
                    onClick={() =>
                      updateMyProduct(product.product.id, product.count - 1)
                    }
                    className="btn btn-outline-success"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}
