import React, { useEffect } from "react";
import ListBrand from "../components/Brand/ListBrand";

export default function Brand() {
  useEffect(() => {
    document.title = "Brand";
  }, []);
  return (
    <>
      <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-screen w-screen overflow-y-scroll">
        <ListBrand />
      </div>
    </>
  );
}
