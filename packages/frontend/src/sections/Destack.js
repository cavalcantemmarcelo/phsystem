import React, { Children } from "react";
import Image from "next/image";

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
      <div className="container mx-auto mb-6">
        <div className="flex items-center justify-center">
          <a href={data.ctaLink}>
            <Image
              src={data.productImage}
              alt={data.title}
              width={300}
              height={347}
              className="mx-auto w-80 h-auto"
            />
          </a>
        </div>
        <h3 className="text-1xl my-4">{data.ctaHeading}</h3>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.sections.map((section, index) => (
          <div
            key={index}
            className="text-white rounded-md p-4 flex flex-col items-center"
          >
            <i
              className={`${section.iconClass} ${section.iconColor} text-4xl mb-4`}
            />
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row flex items-center justify-center">
        <a
          href={data.ctaLink}
          className="bg-pink-500 text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 text-white px-10 my-10 py-4 text-base"
        >
          {data.ctaText}
        </a>
      </div>
    </header>
  );
}

export default Header;
