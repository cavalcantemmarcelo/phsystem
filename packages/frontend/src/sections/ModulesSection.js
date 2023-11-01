import React from 'react';

function ModulesSection({ data }) {
  const { title, subtitle, modules, ctaLink, ctaText } = data;

  return (
    <section id="modules" className="parallax bg-blue max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row py-16 bg-blue">
      <div className="container mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="container mx-auto text-left flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg max-w-md">
              <h2 className="text-2xl mb-6 font-semibold mb-6 text-blue">{module.title}</h2>
              <p>{module.description}</p>
              <ul>
                {module.points.map((point, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check fa-1x text-4xl text-blue mb-1 ml-3 mt-3"></i> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex items-center justify-center">
        <a
          href={ctaLink}
          className="checkout-button cta text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 px-10 py-4 my-16 bg-inherit text-base"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default ModulesSection;
