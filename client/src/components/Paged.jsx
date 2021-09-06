import React from "react";
import styles from './Paged.module.css';

export function Paged ( {countriesPerPage, allCountries, paged}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i + 1); //Número de páginas totales
  }
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navPages}>
        {pageNumbers?.map(number => (
          <li key={number}>
            <a onClick={() => paged(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}