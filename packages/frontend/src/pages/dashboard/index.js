import React from "react";
import Link from "next/link";
import WithLogin from "@/scripts/WithLogin";
import Navigation from "@/components/Navigation";

const Dashboard = ({ children }) => {
  return (
    <>
      <div className="flex-grow bg-gray-100 flex items-center rounded">
        <div className="bg-white p-8 rounded-lg shadow-md ">
          <h1 className="text-2xl font-semibold mb-4">Painel Administrativo</h1>
          {children}
        </div>
      </div>
    </>
  );
};

export default WithLogin(Dashboard);
