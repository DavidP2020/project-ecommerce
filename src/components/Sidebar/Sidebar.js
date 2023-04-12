import React, { useState } from "react";
import arrow from "../../assets/control.png";
import logo from "../../assets/logo.png";
import Menu from "./Menu";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "lg:w-80 w-72" : "w-24"
      } duration-500 h-screen bg-slate-800 text-white relative p-7 pt-8`}
    >
      <img
        src={arrow}
        alt="control.png"
        className={`${
          !open && "rotate-180 rounded-full"
        } absolute cursor-pointer -right-3 top-20 w-8 border-2 border-slate-500 rounded-l-full`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={logo}
          alt="logo.png"
          className={`cursor-pointer duration-500`}
        />
        <h1
          className={`text-white origin-left font-medium 2xl:text-xl xl:text-lg lg:text-sm md:text-sm text-xs duration-500 ${
            !open && "scale-0"
          }`}
        >
          E-Commerce
        </h1>
      </div>
      <Menu open={open} />
    </div>
  );
}
