import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import FormLocation from "./components/FormLocation";
import Loader from "./components/Loader";

function App() {
  const [location, setLocation] = useState();
  const [idLocation, setIdLocation] = useState(getRandomNumber(126));
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${idLocation}`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idLocation]);

  return (
    <div className="body">
      { isLoading && <Loader />}
      <header className="header__page">
        <img className="header__img" src="/logo.svg" alt="Rick and Morty" />
      </header>
      <FormLocation setIdLocation={setIdLocation} />
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <h1>❌ Hey! you must provide an id from 1 to 126 😢</h1>
      ) : (
        <>
          <div className="location-container">
            <LocationInfo location={location} />
          </div>
          <div className="resident-container">
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
