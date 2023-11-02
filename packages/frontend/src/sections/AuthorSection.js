import Image from 'next/image';
import React from 'react';

function AuthorSection({ data }) {
  const { title, teacherName, teacherDescription, teacherImageSrc, ctaLink, ctaText } = data;

  return (
    <section id="author" className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="mb-6 text-2xl font-semibold">{teacherName}</h3>
            <p>{teacherDescription}</p>
          </div>

          <div className="text-center">
            <Image
              src={teacherImageSrc}
              alt={teacherName}
              width={300}
              height={300}
              className="rounded-full w-64 h-64 object-cover object-center mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex items-center justify-center">
        <a
          href={ctaLink}
          className="checkout-button cta text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 px-10 py-4 my-16 mt-20 bg-inherit text-base"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default AuthorSection;
