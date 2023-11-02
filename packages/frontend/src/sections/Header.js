import React, { Children } from "react";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";

function Header({ data }) {
  return (
    <header
      id="header"
      className="text-center flex flex-col px-8 mx-auto py-16"
    >
      <div className="container mx-auto mb-8">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <h2
          className="text-1xl"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        />
      </div>
      <div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Header;
