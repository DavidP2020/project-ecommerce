import React, { useEffect } from "react";
import AdminCategory from "../components/ListCategory/Admin/AdminCategory";
import ListCategory from "../components/ListCategory/ListCategory";

export default function Category() {
  const accessRole = sessionStorage.getItem("auth-role");
  useEffect(() => {
    document.title = "Category";
  }, []);
  return (
    <div className="p-7 pt-4 text-2xl font-semibold">
      {accessRole === "ADMIN" ? <AdminCategory /> : <ListCategory />}
    </div>
  );
}
