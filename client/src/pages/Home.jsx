//import styles from './Home.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountries,
  filterCountriesByRegion,
  orderCountriesByName,
  orderCountriesByPopulation
} from '../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Paged } from '../components/Paged';
import { SearchBar } from '../components/searchBar';
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

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //<<

  useEffect(()=> {
    dispatch(getCountries());
  },[dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  //>> recibe los datos del formulario: "e.target.value":
  function handlerFilterByRegion(e) {
    dispatch(filterCountriesByRegion(e.target.value))
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
      <h1 className={styles.title}>Countries</h1>
      
      <div className={styles.filtersContent}>
        <button onClick={e => {handleClick(e)}}>Reload Countries</button>
        <Link to='/activity'><button>Add Activity</button></Link>
      </div>

      <div className={styles.filtersContent}>
        <SearchBar/>
      </div>

      <div className={styles.filtersContent}>
        {/* Filtrado por continente */}
        <span>Region: </span>
        <select onChange={e => handlerFilterByRegion(e)} >
          <option value='All'>All</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
          <option value='Polar'>Polar</option>
        </select>
        {/* Filtrado por actividad turística */}
        <span>Activity: </span>
        <select>
          <option value='asc'>Ascendent</option>
          <option value='desc'>Descendent</option>
        </select>
        {/* Filtrado por orden alfabético */}
        <span>Order: </span>
        <select onChange={e => handlerOrderByName(e)} >
          <option value='Ascendent'>Ascendent</option>
          <option value='Descendent'>Descendent</option>
        </select>
        {/* Filtrado por población */}
        <span>Population: </span>
        <select onChange={e => handlerOrderByPopulation(e)}>
          <option value='Ascendent'>Ascendent</option>
          <option value='Descendent'>Descendent</option>
        </select>
        {/* //>> PAGINADO */}
        <Paged
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paged={paged}
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