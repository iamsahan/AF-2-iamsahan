import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import CountryCard from "../components/CountryCard"; // Assuming CountryCard is in the same directory
import HeroSection from "../components/HeroSection";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Data for Pie Chart: Top 5 Populated Countries
  const topPopulated = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map((country) => ({
      name: country.name.common,
      population: country.population,
    }));

  // Data for Bar Chart: Population by Region
  const regionData = countries.reduce((acc, country) => {
    const region = country.region || "Other";
    acc[region] = (acc[region] || 0) + country.population;
    return acc;
  }, {});
  const barChartData = Object.entries(regionData).map(
    ([region, population]) => ({
      region,
      population,
    })
  );

  return (
    <>
      <HeroSection />
      <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="relative bg-gradient-to-r bg-black text-white py-16 shadow-lg">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f539b4196')] bg-cover bg-center opacity-20"></div>
          <div className="relative container mx-auto text-center animate__animated animate__fadeIn">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              Explore the World
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Dive into a rich exploration of global cultures, populations, and
              geography with interactive visualizations and maps.
            </p>
            <a
              href="#discover"
              className="mt-6 inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
              Discover Now
            </a>
          </div>
        </header>
        {/* Hero Section */}
        <section>
          <div className="container mx-auto w-screen text-center overflow-hidden">
            <div className="aspect-video w-screen shadow-md overflow-hidden">
              <video
                className="h-full object-cover w-full"
                src="/videos/video-dem.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </section>

        {/* Country Cards Section */}
        <section className="py-16 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeIn">
              Featured Countries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {countries.slice(0, 8).map((country, idx) => (
                <CountryCard
                  key={idx}
                  id={country.cca3}
                  flag={country.flags.svg}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital?.[0] || "N/A"}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Chart Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeIn">
              Population Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Pie Chart */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg animate__animated animate__fadeInLeft">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Top 5 Most Populated Countries
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topPopulated}
                      dataKey="population"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {topPopulated.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Bar Chart */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg animate__animated animate__fadeInRight">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Population by Region
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <XAxis dataKey="region" />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1e6).toFixed(0)}M`}
                    />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar dataKey="population" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
        {/* Flag Gallery Slider */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeIn">
              Flags of the World
            </h2>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              navigation
              className="animate__animated animate__fadeIn"
            >
              {countries.slice(0, 12).map((country, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
                    <img
                      src={country.flags.svg}
                      alt={country.name.common}
                      className="w-32 h-20 object-cover rounded shadow mb-4"
                    />
                    <p className="text-sm font-medium text-center">
                      {country.name.common}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* Map Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 animate__animated animate__fadeIn">
              Interactive Country Map
            </h2>
            <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-xl animate__animated animate__zoomIn">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                {countries.slice(0, 50).map(
                  (country, idx) =>
                    country.latlng && (
                      <Marker key={idx} position={country.latlng}>
                        <Popup>
                          <div className="text-center">
                            <img
                              src={country.flags.svg}
                              alt={country.name.common}
                              className="w-16 h-10 mb-2 mx-auto"
                            />
                            <strong>{country.name.common}</strong>
                            <br />
                            Population: {country.population.toLocaleString()}
                            <br />
                            Capital: {country.capital?.[0] || "N/A"}
                          </div>
                        </Popup>
                      </Marker>
                    )
                )}
              </MapContainer>
            </div>
          </div>
        </section>
        {/* Call to Action */}

        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeIn">
              Want to Learn More?
            </h2>
            <p className="max-w-2xl mx-auto text-lg mb-6">
              Explore detailed country profiles, historical data, and cultural
              insights on our extended platform.
            </p>
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
            >
              Visit REST Countries API
            </a>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p className="text-sm">
            Made with ❤️ using{" "}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              REST Countries API
            </a>
          </p>
          <p className="text-xs mt-2">
            © 2025 Explore the World. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
