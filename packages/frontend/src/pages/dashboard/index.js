import React from "react";
import Link from "next/link";
import withLogin from "@/scripts/withLogin";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 flex items-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <ul>
          <li>
            <Link href="/dashboard/places">Places</Link>
          </li>
          <li>
            <Link href="/dashboard/states">States</Link>
          </li>
          <li>
            <Link href="/dashboard/cities">Cities</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withLogin(Dashboard);
