import React from "react";
import ItemFooterContainer from "./ItemFooterContainer";

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-24">
      <ItemFooterContainer />
      <div className="grid grid-cols-1 gap-10 text-left py-4 px-4 text-gray-400 text-sm">
        <span>© 2023 E Commerce. All rights reserved.</span>
        {/* <span>Terms · Privacy Policy</span> */}
      </div>
    </footer>
  );
}
