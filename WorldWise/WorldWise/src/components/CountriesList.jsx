import CountryItem from "./CountryItem.jsx";
import styles from "./CountriesList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "./../contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  let countries = [];
  cities.forEach((city) => {
    if (
      countries.findIndex((country) => country.country === city.country) === -1
    )
      countries.push(city);
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
