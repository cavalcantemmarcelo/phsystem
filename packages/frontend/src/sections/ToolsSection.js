import React from "react";

function ToolsSection({ data }) {
  const { title, paragraphs, ctaLink, ctaText, imageSrc, imageAlt } = data;

  return (
    <section
      id="tools"
      className="bg-white relative max-w-full sm:mx-4 py-16 shadow rounded-2xl overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="relative max-w-screen-xl px-4 sm:px-2 mx-auto grid grid-cols-12 gap-x-6">
          <div
            data-aos="fade-right"
            className="col-span-12 space-y-8 sm:space-y-6 px-4 sm:px-6 mt-8 aos-init aos-animate"
          >
            <h2
              className="text-4xl font-semibold text-center"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="space-y-2  text-center">
                <h4 className="text-lg font-medium">{paragraph.subtitle}</h4>
                <p className="paragraph text-sm xl:text-base">
                  {paragraph.description}
                </p>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row">
              <a
                href={ctaLink}
                className="cta text-sm text-center rounded-full hover:shadow-md hover:shadow-[#0c66ee]/50 transition duration-300 px-10 py-4 my-16 my-bg-inherit text-base"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
