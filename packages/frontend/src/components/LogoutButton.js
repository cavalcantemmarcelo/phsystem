import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();
  const apiUrl = "http://localhost:3333/auth/logout";

  const handleLogout = async () => {
    sessionStorage.removeItem("token");

    await axios.post(apiUrl, "");

    router.push("/login");
  };

  return (
    <button className="text-red" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
