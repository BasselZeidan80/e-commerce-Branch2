import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";
import NotFound from "./Components/NotFound/NotFound";
import Brand from "./Components/Brands/Brand";
import Categories from "./Components/Categories/Categories";
import AuthContextPProvider from "./Context/AuthContext";
import Guard from "./Components/Guard/Guard";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Favorites from "./Components/Favorites/Favorites";

function App() {
  const myQuery = new QueryClient();
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Guard>
              <Products />{" "}
            </Guard>
          ),
        },
        {
          path: "Cart",
          element: (
            <Guard>
              <Cart />{" "}
            </Guard>
          ),
        },
        {
          path: "Favorites",
          element: (
            <Guard>
              <Favorites />
            </Guard>
          ),
        },
        { path: "Login", element: <Login /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "Brand", element: <Brand /> },
        {
          path: "Categories",
          element: (
            <Guard>
              <Categories />
            </Guard>
          ),
        },
        {
          path: "Products",
          element: (
            <Guard>
              <Products />{" "}
            </Guard>
          ),
        },
        {
          path: "AllOrders",
          element: (
            <Guard>
              <AllOrders />
            </Guard>
          ),
        },
        {
          path: "Payment",
          element: (
            <Guard>
              <Payment />
            </Guard>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <Guard>
              <ProductDetails />
            </Guard>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);


  
  return (
    <div className="App">
      <QueryClientProvider client={myQuery}>
        <AuthContextPProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthContextPProvider>
      </QueryClientProvider>
<Toaster />

    </div>
  );
}

export default App;
