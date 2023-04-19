import React, { useEffect } from "react";
import ListColor from "../components/Color/ListColor";

export default function Color() {
  useEffect(() => {
    document.title = "Color";
  }, []);
  return (
    <>
      <div className="p-7 pt-4 text-2xl font-semibold">
        <ListColor />
      </div>
    </>
  );
}
