import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CountryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const empty = {
    name: "",
    topLevelDomain: [""],
    capital: "",
    subregion: "",
    region: "",
    population: 0,
    borders: [],
    nativeName: "",
    flags: {
      svg: "",
    },
    currencies: [],
    languages: [],
  };

  const [country, setCountry] = useState(empty);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    async function getThisCountry() {
      try {
        const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
        const data = await res.json();
        setCountry(data);
      } catch (err) {
        console.error(err);
      }
    }

    async function getAllCountries() {
      try {
        const res = await fetch("https://restcountries.com/v2/all");
        const data = await res.json();
        setAllCountries(data);
      } catch (err) {
        console.error(err);
      }
    }

    getThisCountry();
    getAllCountries();
  }, [id]);

  const getString = (array) => array.map((item) => item.name).join(", ");

  const getCountryName = (code) =>
    allCountries.find((c) => c.alpha3Code === code)?.name || "";

  return (
    <div className="p-6 sm:p-12 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 mb-8"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-2xl shadow-md">
        <img
          src={country.flags.svg}
          alt={country.name}
          className="w-full lg:w-1/2 h-auto rounded-xl border"
        />

        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-6">{country.name}</h1>

          <div className="flex flex-col sm:flex-row gap-8 mb-6">
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Native Name:</strong> {country.nativeName}
              </li>
              <li>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </li>
              <li>
                <strong>Region:</strong> {country.region}
              </li>
              <li>
                <strong>Subregion:</strong> {country.subregion}
              </li>
              <li>
                <strong>Capital:</strong> {country.capital}
              </li>
            </ul>

            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Top Level Domain:</strong>{" "}
                {country.topLevelDomain.join(", ")}
              </li>
              <li>
                <strong>Currencies:</strong>{" "}
                {getString(country.currencies || [])}
              </li>
              <li>
                <strong>Languages:</strong> {getString(country.languages || [])}
              </li>
            </ul>
          </div>

          <div>
            <strong>Border Countries:</strong>
            <div className="flex flex-wrap gap-2 mt-3">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((border) => (
                  <button
                    key={border}
                    onClick={() => navigate(`/country/${border}`)}
                    className="bg-gray-200 px-3 py-1 rounded-md shadow-sm hover:bg-gray-300"
                  >
                    {getCountryName(border)}
                  </button>
                ))
              ) : (
                <span className="text-gray-600 ml-2">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
