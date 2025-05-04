import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilterOn,
  selectFilterVal,
  selectSearchOn,
  selectSearchVal,
  turnFilterOn,
  turnFilterOff,
  turnSearchOn,
  turnSearchOff,
} from "../features/countriesSlice";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const filterOn = useSelector(selectFilterOn);
  const filterVal = useSelector(selectFilterVal);
  const searchOn = useSelector(selectSearchOn);
  const searchVal = useSelector(selectSearchVal);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let apiUrl;
    if (searchOn && searchVal.trim()) {
      apiUrl = `https://restcountries.com/v2/name/${encodeURIComponent(
        searchVal
      )}`;
    } else if (filterOn && filterVal) {
      apiUrl = `https://restcountries.com/v2/region/${encodeURIComponent(
        filterVal
      )}`;
    } else {
      apiUrl = "https://restcountries.com/v2/all";
    }

    fetchCountries(apiUrl);
  }, [searchOn, searchVal, filterOn, filterVal]);

  function fetchCountries(apiUrl) {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }
        return res.json();
      })
      .then((data) => {
        // Normalize data to always be an array
        const countriesArray = Array.isArray(data) ? data : [];
        setCountries(countriesArray);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setCountries([]);
        setIsLoading(false);
      });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Controls */}
      <SearchFilter />

      {/* Country List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-xl animate-pulse">Loading countries...</p>
          </div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-600">
            <p className="text-xl">Error: {error}</p>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              onClick={() =>
                dispatch(turnFilterOff()) && dispatch(turnSearchOff())
              }
            >
              Reset Filters
            </button>
          </div>
        )}
        {!isLoading && !error && countries.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            <p className="text-xl">
              No countries found. Try adjusting your search or filter.
            </p>
          </div>
        )}
        {!isLoading &&
          !error &&
          countries.map(
            ({ alpha3Code, flags, name, population, region, capital }) => (
              <CountryCard
                key={alpha3Code}
                id={alpha3Code}
                flag={flags?.svg || "https://via.placeholder.com/150"}
                name={name}
                population={population || 0}
                region={region || "N/A"}
                capital={capital || "N/A"}
              />
            )
          )}
      </div>
    </div>
  );
}

function SearchFilter() {
  const dispatch = useDispatch();
  const searchVal = useSelector(selectSearchVal);
  const filterVal = useSelector(selectFilterVal);
  const searchOn = useSelector(selectSearchOn);
  const filterOn = useSelector(selectFilterOn);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.trim()) {
      dispatch(turnSearchOn(value));
    } else {
      dispatch(turnSearchOff());
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value) {
      dispatch(turnFilterOn(value));
    } else {
      dispatch(turnFilterOff());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by country name..."
        value={searchOn ? searchVal : ""}
        onChange={handleSearch}
        className="flex-1 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <select
        value={filterOn ? filterVal : ""}
        onChange={handleFilter}
        className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default CountryList;
