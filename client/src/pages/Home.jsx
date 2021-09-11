//import styles from './Home.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountries,
  filterCountriesByRegion,
  orderCountriesByName,
  orderCountriesByPopulation,
  getActivities,
  filterCountriesByActivity
} from '../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Paginated } from '../components/Paginated';
import { SearchBar } from '../components/SearchBar';
import { NavBar } from '../components/NavBar';
import styles from './Home.module.css';

export function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state)=> state.countries);

  //>> Paginado:
  //Estado inicial: página 1
  const [currentPage, setCurrentPage] = useState(1);
  //Paíces por página: 10
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  //Guardamos countries a mostrar por página
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  //Creo estado inicial para recargar página al ordenar por nombre:
  const [refresh, setRefresh] = useState([]);
  //Traemos las actividades:
  const activities = useSelector((state) => state.activities);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  //<<

  //Actualizamos los países:
  useEffect(()=> {
    dispatch(getCountries());
  },[dispatch])

  //Actualizamos las actividades:
  useEffect(()=> {
    dispatch(getActivities());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  //>> recibe los datos del formulario: "e.target.value":
  function handlerFilterByRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value))
  }

  function handleFilterByActivity(e) {
    dispatch(filterCountriesByActivity(e.target.value));
    //console.log(e.target.value);
  }

  function handlerOrderByName(e) {
    e.preventDefault();
    dispatch(orderCountriesByName(e.target.value))
    setCurrentPage(1);
    setRefresh(`Ordered By Name ${e.target.value}`) //Modifico estado local para recargar
  }

  function handlerOrderByPopulation(e) {
    e.preventDefault();
    dispatch(orderCountriesByPopulation(e.target.value))
    setCurrentPage(1);
    setRefresh(`Ordered By Population ${e.target.value}`) //Modifico estado local para recargar
  }
  //<<

  return (
    <div>
      <NavBar />
      
      <div className={styles.content}>
        <div className={styles.searchContent}>
          <button className={styles.button} onClick={e => {handleClick(e)}}>Reload Countries</button>
          <Link to='/activity'><button className={styles.button}>Add Activity</button></Link>
          <SearchBar className={styles.button} />
        </div>

        <div className={styles.filterContent}>
          {/* Filtrado por continente */}
          <span className={styles.item}>Region: </span>
          <select className={styles.select} onChange={e => handlerFilterByRegion(e)} >
            <option value='All'>All</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
            <option value='Polar'>Polar</option>
          </select>
          {/* Filtrado por actividad turística */}
          <span className={styles.item}>Activity: </span>
          <select className={styles.select} onChange={(e) => handleFilterByActivity(e)} >
            {
              activities.map((a) => (
                <option value={a.name} key={a.name}>{a.name}</option>
              ))
            }
          </select>
          {/* Filtrado por orden alfabético */}
          <span className={styles.item}>Order: </span>
          <select className={styles.select} onChange={(e) => handlerOrderByName(e)} >
            <option value='Ascendent'>Ascendent</option>
            <option value='Descendent'>Descendent</option>
          </select>
          {/* Filtrado por población */}
          <span className={styles.item}>Population: </span>
          <select className={styles.select} onChange={e => handlerOrderByPopulation(e)}>
            <option value='Ascendent'>Ascendent</option>
            <option value='Descendent'>Descendent</option>
          </select>
        </div>
      </div>
      
      {/* //>> PAGINADO */}
      <div>
        <Paginated
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginated={paginated}
        />
        {/* //<< PAGINADO */}
        <ul className={styles.countriesGrid}>
          {
            currentCountries?.map(c => {
              return (
                // key => evitar warning!!!
                <div key={c.name}>
                  <Link to={`/home/${c.id}`}>
                    <Card
                      flag={c.flag}
                      name={c.name}
                      region={c.region}
                      population={c.population}
                    />
                  </Link>
                </div>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}