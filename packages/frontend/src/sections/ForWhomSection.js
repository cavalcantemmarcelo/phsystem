import React from 'react';

function ForWhomSection({ data }) {
  const { title, points, ctaLink, ctaText } = data;

  return (
    <section id="for-whom" className="parallax bg-blue max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row py-16 bg-blue">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <ul className="mx-auto w-3/6">
        {points.map((point, index) => (
          <li key={index}>
            <i className="fas fa-check fa-1x text-4xl text-blue ml-3 mt-3"></i> {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row flex items-center justify-center">
        <a
          href={ctaLink}
          className="cta text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 px-10 py-4 my-16 bg-inherit text-base"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default ForWhomSection;
