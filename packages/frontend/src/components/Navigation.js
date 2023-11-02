import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navigation = () => {
  return (
    <nav className="bg-blue-900 py-4 w-full p-5 mb-10">
      <div className="container flex justify-between items-center w-full">
        <Link href="/" passHref className="text-white text-2xm font-semibold">
          PH System
        </Link>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
