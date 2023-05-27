import React from "react";
import { Link } from "react-router-dom";

const ItemNavbar = ({ Links, button }) => {
  return (
    <>
      {button === "1" ? (
        <ul className="text-sm font-semibold uppercase flex gap-8">
          {Links.map((link) => (
            <li className="hover:underline" key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="px-6 pt-4 text-sm font-semibold uppercase flex flex-col gap-6">
          {Links.map((link) => (
            <li className="hover:underline" key={link.name}>
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ItemNavbar;
