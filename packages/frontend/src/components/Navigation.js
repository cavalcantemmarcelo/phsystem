import Link from "next/link";
import LogoutButton from "./LogoutButton";
import isAuthenticated from "@/scripts/IsAuthenticated";
import { useEffect, useState } from "react";

const Navigation = () => {
  const menuItems = (
    <ul className="flex space-x-4">
      <li>
        <Link
          href="/dashboard"
          passHref
          className="text-white hover:text-gray-300"
        >
          Painel
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/places"
          passHref
          className="text-white hover:text-gray-300"
        >
          Locais de Atendimento
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/appointments"
          passHref
          className="text-white hover:text-gray-300"
        >
          Atendimentos
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/cities"
          passHref
          className="text-white hover:text-gray-300"
        >
          Cidades
        </Link>
      </li>
      <li>
        <Link
          href="/dashboard/states"
          passHref
          className="text-white hover:text-gray-300"
        >
          Estados
        </Link>
      </li>
      <li>
        <LogoutButton />
      </li>
    </ul>
  );

  const notLoggedMenuItems = (
    <ul className="flex space-x-4">
      <Link href="/login" passHref className="text-white hover:text-gray-300">
        Login
      </Link>
      <li>
        <Link
          href="/register"
          passHref
          className="text-white hover:text-gray-300"
        >
          Cadastro
        </Link>
      </li>
    </ul>
  );

  const [menu, setMenu] = useState(notLoggedMenuItems);
  const [user, setUser] = useState(null);

  useEffect(() => {
    isAuthenticated()
      .then((response) => {
        if (response) {
          const user = response.data.user_info;
          setUser(user);
          setMenu(user ? menuItems : notLoggedMenuItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setMenu(notLoggedMenuItems);
      });
  }, []);

  return (
    <div className="w-full mb-20 ">
      <nav className="bg-blue-900 p-5 mb-5 w-fi;;">
        <div className="flex justify-between items-center w-full">
          <Link href="/" passHref className="text-white text-2xm font-semibold">
            PH System
          </Link>
          {menu}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
