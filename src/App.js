import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Aboutus from "./pages/Aboutus";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import axios from "axios";
import { useEffect, useState } from "react";
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
import Laporan_Tahunan from "./components/Laporan/Laporan_Tahunan";
import User from "./pages/User";
import Ongkir from "./pages/Ongkir";

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
    if (accessToken) {
      axios.get("api/checkingAuthenticated").then((res) => {
        if (res.data.status === 200) {
          setLogin(true);
        }
        setLoading(false);
      });
    } else {
      return () => {
        setLogin(false);
      };
    }
  }, []);
  const refreshToken = async () => {
    try {
      const resp = await axios.get("api/refresh");
      return resp.data;
    } catch (e) {
      console.log("Error", e);
    }
  };

  axios.interceptors.request.use(
    async (config) => {
      const token = accessToken;
      if (token) {
        config.headers["Authorization"] = ` Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const resp = await refreshToken();

        const access_token = resp.data.token;

        localStorage.setItem("auth-token", access_token);

        return (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`);
      }
      return Promise.reject(error);
    }
  );
  //Check Authorization
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
      {!isLogin ? (
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
              <Route path="/ongkir" element={<Ongkir />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/brands" element={<BrandPage />} />
              <Route path="/brands/:name" element={<BrandProduct />} />
              <Route path="/color" element={<Color />} />
              <Route path="/location" element={<Location />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/laporan-tahunan/:year"
                element={<Laporan_Tahunan />}
              />
            </Routes>
          ) : accessRole === "OWNER" ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/laporan-tahunan/:year"
                element={<Laporan_Tahunan />}
              />
              <Route path="/shop-now" element={<Shopnow />} />
              <Route path="/location" element={<Location />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/order" element={<Order />} />
              <Route path="/brands" element={<BrandPage />} />
              <Route path="/brands/:name" element={<BrandProduct />} />{" "}
              <Route path="/category/:slug" element={<ListProduct />} />
              <Route
                path="/category/:slug/:product"
                element={<DetailProduct />}
              />
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
      )}
    </>
  );
}

export default App;
