import React, { useEffect } from "react";

export default function Order() {
  useEffect(() => {
    document.title = "Order";
  }, []);
  return (
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      <h1>Order</h1>
    </div>
  );
}
