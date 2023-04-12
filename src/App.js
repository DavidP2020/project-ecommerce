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
import Weight from "./pages/Weight";
import ListProduct from "./components/Product/ListProduct";
import DetailProduct from "./components/Product/DetailProduct";
function App() {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const accessToken = sessionStorage.getItem("auth-token");
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
    <div className="flex">
      <Sidebar />

      {!isLogin ? (
        <div className="flex flex-wrap items-center justify-center h-screen w-screen overflow-scroll">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:slug" element={<ListProduct />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center h-screen w-screen overflow-scroll">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:slug" element={<ListProduct />} />
            <Route
              path="/category/:slug/:product"
              element={<DetailProduct />}
            />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/color" element={<Color />} />
            <Route path="/weight" element={<Weight />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
