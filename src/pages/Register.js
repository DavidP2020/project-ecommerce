import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/bg.jpg";
export default function Register() {
  const [error, setError] = useState();
  const [errors, setErrors] = useState();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmPassword) {
      setErrors("The Confirm password field is required.");
    } else if (password !== confirmPassword) {
      setError("Password Doesn't match with The Confirm Password");
    } else {
      setErrors("");
    }
    try {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/api/register", JSON.stringify({ name, email, password }))
          .then((resp) => {
            console.log(resp.data);
            if (resp.data.status === 200) {
              alert(resp.data.message);
              const accessToken = resp.data.token;
              sessionStorage.setItem("auth-token", accessToken);
              sessionStorage.setItem("auth-name", resp.data.username);
              navigate("/");
              window.location.reload(false);
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
    document.title = "Register";
  }, []);
  return (
    <section className="flex flex-col md:flex-row h-screen items-center w-full ">
      <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img className="w-full h-full object-cover" src={Bg} alt="" />
      </div>

      <div className="bg-white w-full lg:w-1/2 xl:w-1/3 h-screen flex items-center justify-center ">
        <form
          className="w-full mx-auto rounded-lg bg-white p-10 px-8 h-screen shadow-black shadow-lg overflow-x-scroll"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center p-4 ">Sign Up</h1>
          <div className="text-xs text-center p-2">
            <span>Please Sign Up to continue</span>
          </div>
          {error ? (
            <div className="text-center bg-red-500 w-full text-white p-4 mt-2 mb-4 text-xs">
              <ul>
                <li>{error.email}</li>
                <li>{error.name}</li>
                <li>{error.password}</li>
                <li>{errors}</li>
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
              Already Have An Account ? <Link to="/">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
