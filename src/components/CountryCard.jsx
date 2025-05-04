import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";

function CountryCard({ id, flag, name, population, region, capital }) {
  const navigate = useNavigate();

  return (
    <CardActionArea
      key={id}
      className="rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div
        onClick={() => navigate(`/country/${id}`)}
        className="flex flex-col h-full cursor-pointer"
      >
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={flag}
          alt={`${name} flag`}
        />
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{name}</h2>
          <ul className="text-gray-600 space-y-1">
            <li>
              <span className="font-semibold">Population: </span>
              {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </li>
            <li>
              <span className="font-semibold">Region: </span>
              {region}
            </li>
            <li>
              <span className="font-semibold">Capital: </span>
              {capital}
            </li>
          </ul>
        </div>
      </div>
    </CardActionArea>
  );
}

export default CountryCard;
