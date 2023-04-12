import React, { useEffect } from "react";
import ListWeight from "../components/Weight/ListWeight";

export default function Weight() {
  useEffect(() => {
    document.title = "Weight";
  }, []);
  return (
    <>
      <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-screen w-screen overflow-scroll">
        <ListWeight />
      </div>
    </>
  );
}
