import React from "react";
import Spline from "@splinetool/react-spline";

function HeroSection() {
  return (
    <section className="min-h-[950px] pt-20 flex flex-col">
      {/* Top Half - Dark */}
      <div className="relative bg-black text-white flex-1 flex items-center overflow-hidden">
        {/* White Vertical Grid */}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 ml-16 lg:mb-0 animate__animated animate__fadeIn animate__delay-1s">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              The World on Factbook
            </h1>
            <div className="border-l-4 border-red-600 pl-4 mb-6">
              <p className="text-lg md:text-xl max-w-md">
                The World Factbook provides basic on intelligence on the
                history, people, government, economy, geography, military, and
                more.
              </p>
            </div>

            <button className="bg-yellow-300 mt-8 px-8 py-2 rounded-2xl text-black">
              Explore{" "}
            </button>
          </div>

          <div className="w-full flex justify-center lg:justify-end animate__animated animate__fadeIn animate__delay-2s h-[500px] lg:h-[600px]">
            <Spline
              className="w-full h-full"
              scene="/spline/scene-20.splinecode"
            />
          </div>
        </div>
      </div>

      {/* Bottom Half - Light */}
      <div className="relative bg-white h-[200px] flex items-center overflow-hidden">
        {/* Black Vertical Grid */}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <p className="text-black text-lg mb-4">
            Explore over 265 world entities and their data.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-black">
            <div>
              <p className="text-2xl font-semibold">8B+</p>
              <p className="text-sm text-gray-600">World Population</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">4,300+</p>
              <p className="text-sm text-gray-600">Religions Practiced</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">7,000+</p>
              <p className="text-sm text-gray-600">Languages Spoken</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
