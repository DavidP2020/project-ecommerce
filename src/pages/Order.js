import React, { useEffect } from "react";
import ListOrder from "../components/Order/ListOrder";

export default function Order() {
  useEffect(() => {
    document.title = "Order";
  }, []);
  return (
    <div className="p-7 pt-4 text-2xl font-semibold">
      <ListOrder />
    </div>
  );
}
