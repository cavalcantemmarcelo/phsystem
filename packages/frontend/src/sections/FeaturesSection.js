import React from 'react';

function FeaturesSection({ data }) {
  const { title, subtitle, features, ctaLink, ctaText } = data;

  return (
    <section id="features" className="parallax bg-blue max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row py-16 bg-blue">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-center">
              <i className={`${feature.iconClass} text-4xl text-blue mb-6`} />
              <h5 className="text-xl font-semibold mb-2">{feature.title}</h5>
              <p className="text-gray-700 text-center">{feature.description}</p>
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

export default FeaturesSection;