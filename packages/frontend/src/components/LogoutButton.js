import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "@/context/UserProvider";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phsysystem-api.onrender.com";
const apiUrl = baseUrl + "/auth/logout";

const LogoutButton = () => {
  const router = useRouter();
  const { user, logout, login } = useUser();

  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    logout();
    await axios.post(apiUrl, "");

    router.push("/login");
  };

  return (
    <button
      className="text-white text-small cursor-pointer rounded-sm px-2 bg-blue-700"
      onClick={handleLogout}
    >
      Sair
    </button>
  );
};

export default LogoutButton;
