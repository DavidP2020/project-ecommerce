import React, { useEffect } from "react";

export default function Aboutus() {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      <h1>About Us</h1>
    </div>
  );
}
