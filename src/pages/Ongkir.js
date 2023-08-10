import React, { useEffect } from "react";
import ListOngkir from "../components/Ongkir/ListOngkir";

export default function Ongkir() {
  useEffect(() => {
    document.title = "Location";
  }, []);
  return (
    <>
      <div className="p-7 pt-4 text-2xl font-semibold">
        <ListOngkir />
      </div>
    </>
  );
}
