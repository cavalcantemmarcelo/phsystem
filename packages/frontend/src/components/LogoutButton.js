import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3333/auth/logout";

  const handleLogout = async () => {
    sessionStorage.removeItem("token");

    await axios.post(apiUrl, "");

    router.push("/Login");
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover-bg-red-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
