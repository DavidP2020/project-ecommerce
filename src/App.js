import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Aboutus from "./pages/Aboutus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Box, CircularProgress } from "@mui/material";
import Product from "./pages/Product";
import Color from "./pages/Color";
import Brand from "./pages/Brand";
import ListProduct from "./components/Product/ListProduct";
import DetailProduct from "./components/Product/DetailProduct";
import NavbarPanel from "./components/Navbar/NavbarPanel";
import Home from "./pages/Home";
import DetailProductSetting from "./components/Product/Admin/DetailProduct/DetailProductSetting";
import Location from "./pages/Location";
import Footer from "./components/Home/Footer/Footer";
import Checkout from "./components/Transaction/Checkout";
import Shopnow from "./components/Product/Shopnow";
import BrandPage from "./components/Brand/BrandPage";
import BrandProduct from "./components/Brand/BrandProduct";
import Wishlist from "./pages/Wishlist";
import User from "./pages/User";
function App() {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const accessRole = localStorage.getItem("auth-role");
  const accessToken = localStorage.getItem("auth-token");
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
    return config;
  });

  useEffect(() => {
    axios.get("api/checkingAuthenticated").then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setLogin(true);
      }
      setLoading(false);
    });

    return () => {
      setLogin(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      setLoading(false);
      if (err.response.status === 401) {
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      if (err.response.status === 404) {
        console.log("404");
      }
    }
  );

  //fungsi untuk loading
  if (accessToken) {
    if (isLoading) {
      return (
        <div className="screen">
          <Box sx={{ display: "flex" }}>
            <div className="loading">
              <CircularProgress />
              <div>Loading</div>
            </div>
          </Box>
        </div>
      );
    }
  }
  return (
    <>
      <NavbarPanel />
      {/* <div className="flex"> */}
      {/* <Sidebar /> */}

      {!isLogin ? (
        // <div className="flex flex-wrap items-center justify-center h-screen w-screen overflow-scroll">
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop-now" element={<Shopnow />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/brands/:name" element={<BrandProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:slug" element={<ListProduct />} />
            <Route
              path="/category/:slug/:product"
              element={<DetailProduct />}
            />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/location" element={<Location />} />
          </Routes>

          <Footer />
        </>
      ) : (
        // </div>
        <>
          {accessRole === "ADMIN" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop-now" element={<Shopnow />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/manage-user" element={<User />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:slug" element={<ListProduct />} />
              <Route
                path="/category/:slug/:product"
                element={<DetailProduct />}
              />
              <Route path="/product" element={<Product />} />
              <Route
                path="/product/detail-product/:id"
                element={<DetailProductSetting />}
              />
              <Route path="/order" element={<Order />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/brands" element={<BrandPage />} />
              <Route path="/brands/:name" element={<BrandProduct />} />
              <Route path="/color" element={<Color />} />
              <Route path="/location" element={<Location />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop-now" element={<Shopnow />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:slug" element={<ListProduct />} />
              <Route
                path="/category/:slug/:product"
                element={<DetailProduct />}
              />
              <Route path="/order" element={<Order />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/location" element={<Location />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/brands" element={<BrandPage />} />
              <Route path="/brands/:name" element={<BrandProduct />} />
            </Routes>
          )}

          <Footer />
        </>
        // <div className="flex flex-wrap items-center justify-center h-screen w-screen overflow-scroll">
        // {/* <Navbar /> */}
        // </div>
      )}
      {/* </div> */}
    </>
  );
}

export default App;
