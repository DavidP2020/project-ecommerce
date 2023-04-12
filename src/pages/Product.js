import React, { useEffect } from "react";
import AdminProduct from "../components/Product/Admin/AdminProduct";
export default function Product() {
  useEffect(() => {
    document.title = "Product";
  }, []);
  return (
    <>
      <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-screen w-screen overflow-y-scroll">
        <AdminProduct />
      </div>
    </>
  );
}
