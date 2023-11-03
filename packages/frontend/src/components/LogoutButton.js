import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LogoutButton = () => {
  const router = useRouter();
  const apiUrl = process.env.BASE_URL + "/auth/logout";

  const handleLogout = async () => {
    sessionStorage.removeItem("token");

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
