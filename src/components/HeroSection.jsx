function HeroSection() {
  return (
    <section className="bg-gray-900 text-white min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 animate__animated animate__fadeIn animate__delay-1s">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The World Factbook
          </h1>
          <p className="text-lg md:text-xl max-w-md mb-8 border-l-4 border-red-600 pl-4">
            The World Factbook provides basic intelligence on the history,
            people, government, economy, energy, geography, environment,
            communications, transportation, military, terrorism, and
            transnational issues for 265 world entities.
          </p>
          <p className="text-2xl md:text-3xl font-semibold italic">
            Travel the globe with Crusious.
          </p>
          <div className="flex items-center mt-6 text-sm">
            <span className="mr-2">○ ●</span>
            <p>Edition: May 1, 2025</p>
          </div>
        </div>

        {/* Right Side: Eagle Logo */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end animate__animated animate__fadeIn animate__delay-2s">
          <img
            src="https://via.placeholder.com/400x400?text=CIA+Eagle+Logo"
            alt="CIA World Factbook Eagle Logo"
            className="w-64 md:w-80 lg:w-96"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
