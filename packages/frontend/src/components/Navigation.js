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
      <li>
        <Link href="/login" passHref className="text-white hover:text-gray-300">
          Login
        </Link>
      </li>
    </ul>
  );

  const [menu, setMenu] = useState(notLoggedMenuItems);

  useEffect(() => {
    setMenu(
      isAuthenticated() && isAuthenticated().length > 0
        ? menuItems
        : notLoggedMenuItems
    );
  }, []);

  return (
    <nav className="bg-blue-900 py-4 w-full p-5 mb-10">
      <div className="container flex justify-between items-center w-full">
        <Link href="/" passHref className="text-white text-2xm font-semibold">
          PH System
        </Link>
        {menuItems}
      </div>
    </nav>
  );
};

export default Navigation;
