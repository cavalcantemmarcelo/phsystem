import Image from "next/image";
import React from "react";

function Footer({ data }) {
  return (
    <footer className="bg-blue-400 p-4 w-full items-center lg:justify-between py-4 lg:px-4 mt-20">
      <p className="text-center">
        {data?.disclaimer
          ? data.disclaimer
          : "PH System - Sistema de Saúde Pública"}
      </p>
      <div className="production text-center justify-between">
        <p>&copy; {data?.copyright ? data.copyright : "Versão 0.0.1"}</p>
      </div>
    </footer>
  );
}

export default Footer;
