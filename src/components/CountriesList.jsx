import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(countries)
  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
