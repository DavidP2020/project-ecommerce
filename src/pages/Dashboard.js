import React, { useEffect } from "react";
import "../App.css";

export default function Dashboard() {
  const username = localStorage.getItem("auth-name");
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className=" p-7 pt-4 text-2xl font-semibold flex-1 h-screen">
      <h1>Dashboard</h1>
      <div className="w-full border border-black mt-2 border-y-2 rounded-full"></div>

      <div className="text-lg mt-6">Welcome, {username}</div>

      <div className="relative">
        <div className="container h-32">
          <div className="flex-scroll">
            <div className="card">
              <div className="flex flex-row -mb-3">
                <div className="p-2">
                  <i className="fas fa-solid fa-truck-fast text-4xl mb-3 p-4 w-fit bg-slate-300 rounded-lg"></i>
                </div>
                <div className="mt-4">
                  <div className="w-full text-sm font-normal">Transaction</div>
                  <div className="w-full font-bold text-xl">1</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex flex-row -mb-2">
                <div className="p-2">
                  <i className="fas fa-solid fa-money-bill-1-wave text-4xl mb-3 p-4 w-fit bg-slate-300 rounded-lg"></i>
                </div>
                <div className="mt-4">
                  <div className="w-full text-sm font-normal">
                    Expense This Month
                  </div>
                  <div className="w-full font-bold text-xl">
                    <span className="text-2xl">Rp. </span> 1
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex flex-row -mb-2">
                <div className="p-2">
                  <i className="fas fa-regular fa-hand-holding-dollar text-4xl mb-3 p-4 w-fit bg-slate-300 rounded-lg"></i>
                </div>
                <div className="mt-4">
                  <div className="w-full text-sm font-normal">Unpaid</div>
                  <div className="w-full font-bold text-xl">
                    <span className="text-2xl">Rp. </span> 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
