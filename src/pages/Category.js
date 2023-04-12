import React, { useEffect } from "react";
import AdminCategory from "../components/ListCategory/Admin/AdminCategory";
import ListCategory from "../components/ListCategory/ListCategory";
import ListProduct from "../components/Product/ListProduct";

export default function Category() {
  const accessRole = sessionStorage.getItem("auth-role");
  useEffect(() => {
    document.title = "Categ0ry";
  }, []);
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-screen w-screen">
      {accessRole === "ADMIN" ? <ListCategory /> : <AdminCategory />}
    </div>
  );
}
