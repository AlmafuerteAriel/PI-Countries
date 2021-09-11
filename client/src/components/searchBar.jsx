import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountriesByName } from "../redux/actions";
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  
  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    //setName('');
  }

  return (
    <form className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input 
          className={styles.searchInput}
          type="text"
          placeholder='Search Countries...'
          onChange={(e) => handlerInputChange(e)}
        />
        <button className={styles.searchButton} type='submit' onClick={
          (e) => { handlerSubmit(e) }
        }>
          <FiSearch className={styles.imageButton} />
        </button>
      </div>
    </form>
  )
}