import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountyDetails } from '../redux/actions';
import { NavBar } from '../components/NavBar';
import styles from './Details.module.css';

export function Details(props) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCountyDetails(props.match.params.id));
  }, [dispatch])

  const country = useSelector ((state) => state.countryDetails);
  //console.log(country); // {}
  //console.log(props.match.params.id);

  //Verifico que existan actividades:
  const existActivities = country.activities?.length ? '' : 'No activities';

  return (
    <div className={styles.content}>
      <NavBar />
      <div className={styles.card}>
        <img className={styles.image} src={country.flag} alt={country.name} />
        <h2>Country: {country.name}</h2>
        <h3>alpha3Code: {country.id}</h3>
        <h3>Region: {country.region}</h3>
        <h3>Subregion: {country.subregion}</h3>
        <h3>Area in km &#178;: {country.area}</h3>
        <h3>Area in millon km &#178;: {country.area / 1000000}</h3>
        <h3>Population: {country.population}</h3>
        <h3 >Activities: {existActivities}</h3>
        <ul className={styles.countriesGrid}>
          {
            country.activities?.map(c => {
              return (
                // key => evitar warning!!!
                <li className={styles.item} key={c.name}>
                  <h4>{c.name}</h4>
                  <h5>Duration: {c.duration}</h5>
                  <h5>Difficulty: {c.difficulty}</h5>
                  <h5>Season: {c.season}</h5>
                </li>
              )
            })
          }
        </ul>
      </div> 
    </div>
  )
}