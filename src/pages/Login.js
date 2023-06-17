import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/login.svg";
export default function Login() {
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/api/login", JSON.stringify({ email, password }))
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.status === 200) {
              alert(resp.data.message);
              const accessToken = resp.data.token;
              localStorage.setItem("auth-token", accessToken);
              localStorage.setItem("auth-id", resp.data.id);
              localStorage.setItem("auth-name", resp.data.username);
              localStorage.setItem("auth-role", resp.data.role);
              localStorage.setItem("auth-email", resp.data.email);
              navigate("/");
              window.location.reload(false);
            } else if (resp.data.status === 401) {
              alert(resp.data.message);
            } else if (resp.data.status === 403) {
              alert(resp.data.message);
            } else {
              setError(resp.data.validation_errors);
            }
          });
      });
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <section className="flex flex-col md:flex-row h-screen items-center w-full">
      <div className="bg-white w-full lg:w-1/2 xl:w-1/3 h-screen flex items-center justify-center">
        <form
          className="w-full mx-auto rounded-lg bg-white p-10 py-8 h-screen overflow-x-scroll"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center p-4">Sign In</h1>
          <div className="text-xs text-center p-2">
            <span>Mohon Registrasi Terlebih Dahulu Untuk Melanjutkannya</span>
          </div>
          {error ? (
            <div className="text-center bg-red-500 w-full text-white p-4 mt-2 mb-4">
              {error && (
                <ul>
                  <li>{error.email}</li>
                  <li>{error.password}</li>
                </ul>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="flexInput">
            <TextField
              helperText="Please enter your Email"
              id="email"
              name="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flexInput">
            <TextField
              helperText="Please enter your Password"
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flexButton">
            <button className="buttonPrimary" type="submit">
              Sign In
            </button>
            <div className="text-right text-xs">
              <Link to="/register">Lupa Password ?</Link>
            </div>
            <div className="text-center text-xs">
              Belum Memiliki Akun ? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden md:block px-8 md:w-1/2 xl:w-2/3 h-screen ">
        <div className="flex flex-col justify-center">
          <img className="object-cover" src={Bg} alt="" />
        </div>
      </div>
    </section>
  );
}
