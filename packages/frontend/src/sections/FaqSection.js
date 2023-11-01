import React from 'react';

function FaqSection({ data }) {
  return (
    <section id="faq" className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {data.qas.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-black">
              <h3 className="mb-6 text-2xl font-semibold text-black">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row flex items-center justify-center">
        <a
          href={data.ctaLink}
          className="checkout-button cta text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 px-10 py-4 my-16 bg-inherit text-black text-base"
        >
          {data.ctaText}
        </a>
      </div>
    </section>
  );
}

export default FaqSection;
