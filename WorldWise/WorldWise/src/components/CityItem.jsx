import stytes from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteCity(id);
    e.stopPropagation();
  };
  return (
    <li>
      <Link
        className={`${stytes.cityItem} ${
          id === currentCity.id ? stytes["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={stytes.emoji}>{emoji}</span>
        <h3 className={stytes.name}>{cityName}</h3>
        <time className={stytes.date}>{formatDate(date)}</time>
        <button className={stytes.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
