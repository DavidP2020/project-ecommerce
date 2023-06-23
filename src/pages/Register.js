import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/register.svg";
export default function Register() {
  const [error, setError] = useState();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post(
          "/api/register",
          JSON.stringify({ name, email, password, password_confirmation })
        )
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === 200) {
            alert(resp.data.message);
            navigate("/login");
          } else {
            setError(resp.data.validation_errors);
          }
        });
      // });
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <section className="flex flex-col md:flex-row h-screen items-center w-full">
      <div className="hidden md:block px-8 md:w-1/2 xl:w-2/3 h-screen ">
        <div className="flex flex-col justify-center">
          <img className="object-cover" src={Bg} alt="" />
        </div>
      </div>

      <div className="bg-white w-full lg:w-1/2 xl:w-1/3 h-screen flex items-center justify-center ">
        <form
          className="w-full mx-auto rounded-lg bg-white p-10 px-8 h-screen  overflow-x-scroll"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center p-4 ">Sign Up</h1>
          <div className="text-xs text-center p-2">
            <span>Mohon Registrasi Terlebih Dahulu Untuk Melanjutkannya</span>
          </div>
          {error ? (
            <div className="text-center bg-red-500 w-full text-white p-4 mt-2 mb-4 text-xs">
              <ul>
                <li>{error.email}</li>
                <li>{error.name}</li>
                <li>{error.password}</li>
                <li>{error.password_confirmation}</li>
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className="flexInput">
            <TextField
              helperText="Please enter your Username"
              id="usernameil"
              name="username"
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div className="flexInput">
            <TextField
              helperText="Please enter your Confirm-Password"
              id="password"
              name="password"
              label="Confirm-Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flexButton">
            <button className="buttonPrimary" type="submit">
              Sign Up
            </button>
            <div className="text-center text-xs">
              Sudah Memiliki Akun ? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
