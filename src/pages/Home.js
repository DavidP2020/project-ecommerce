import React, { useEffect } from "react";

import LandingPage from "../components/Home/LandingPage";
import CategoryPage from "../components/ListCategory/CategoryPage";
export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div className="w-full h-screeen ">
      <LandingPage />

      <CategoryPage />
    </div>
  );
}
