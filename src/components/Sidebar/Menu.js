import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu({ open, ...props }) {
  const [idx, setIdx] = useState(0);
  const accessToken = localStorage.getItem("auth-token");

  const Menus = [
    {
      title: "Login",
      src: "fas fa-regular fa-right-to-bracket",
      link: "/",
    },
    { title: "Category", src: "fas fa-solid fa-shop", link: "/category" },
    { title: "Product", src: "fas fa-solid fa-shop", link: "/product" },
    { title: "Order", src: "fas fa-regular fa-clipboard-list", link: "/order" },
  ];
  const AdminMenus = [
    {
      title: "Dashboard",
      src: "fas fa-solid fa-chart-line",
      link: "/",
    },
    { title: "Category", src: "fas fa-solid fa-shop", link: "/category" },
    { title: "Product", src: "fas fa-solid fa-shop", link: "/product" },
    { title: "Order", src: "fas fa-regular fa-clipboard-list", link: "/order" },
    { title: "Brand", src: "fas fa-regular fa-clipboard-list", link: "/brand" },
    { title: "Color", src: "fas fa-regular fa-clipboard-list", link: "/color" },
  ];
  return (
    <>
      {accessToken ? (
        <div>
          <ul className="pt-4">
            {AdminMenus.map((menu, index) => {
              return (
                <Link to={menu.link} key={index}>
                  <li
                    className={`${
                      !open && "justify-center"
                    } text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-cyan-700 rounded-md mt-4 ${
                      index === idx && "bg-sky-800"
                    }`}
                    onClick={() => setIdx(index)}
                  >
                    <i
                      className={`${menu.src} xl:text-lg md:text-sm text-xs`}
                    ></i>
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300  text-xs`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <ul className="pt-4">
            {Menus.map((menu, index) => {
              return (
                <Link to={menu.link} key={index}>
                  <li
                    className={`${
                      !open && "justify-center"
                    } text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-cyan-700 rounded-md mt-4 ${
                      index === idx && "bg-sky-800"
                    }`}
                    onClick={() => setIdx(index)}
                  >
                    <i
                      className={`${menu.src} xl:text-lg md:text-sm text-xs`}
                    ></i>
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300  text-xs`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
