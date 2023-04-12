import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Bg from "../assets/bg.jpg";
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
              sessionStorage.setItem("auth-token", accessToken);
              sessionStorage.setItem("auth-name", resp.data.username);
              sessionStorage.setItem("auth-role", resp.data.role);
              navigate("/");
              window.location.reload(false);
            } else if (resp.data.status === 401) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-slate-800 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-white p-10 px-8 h-3/4 shadow-black shadow-lg overflow-x-scroll"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center p-4">Sign In</h1>
          <div className="text-xs text-center p-2">
            <span>Please Sign in to continue</span>
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
            <div className="text-center text-xs">
              Don't Have An Account ? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={Bg} alt="" />
      </div>
    </div>
  );
}