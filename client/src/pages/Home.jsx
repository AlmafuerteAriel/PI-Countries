//import styles from './Home.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state)=> state.countries)
  useEffect(()=> {
    dispatch(getCountries());
  },[dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to='/activity'>Agregar Actividad</Link>
      <h1>Countries</h1>
      <button onClick={e => {handleClick(e)}} >Reload Countries</button>
      <div>
        {/* Filtrado por continente */}
        <select>
          <option value='All'>All</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
        {/* Filtrado por actividad turística */}
        <select>
          <option value='asc'>Ascendent</option>
          <option value='desc'>Descendent</option>
        </select>
        {/* Filtrado por orden alfabético */}
        <select>
          <option value='asc'>Ascendent</option>
          <option value='desc'>Descendent</option>
        </select>
        {/* Filtrado por población */}
        <select>
          <option value='asc'>Ascendent</option>
          <option value='desc'>Descendent</option>
        </select>
        {
          allCountries?.map(c => {
            return (
              <div>
                <Link to={'/home/' + c.id}>
                  <Card flag={c.flag} name={c.name} region={c.region}/>
                </Link>
              </div>
            )
            
          })
        }
      </div>
    </div>
  )

}