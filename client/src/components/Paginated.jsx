import React from "react";
import styles from './Paginated.module.css';

export function Paginated (
  {countriesPerPage, allCountries, paginated, currentPage}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i + 1); //Número de páginas totales
  }
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navPages}>
        {pageNumbers?.map(number => (
          <li
            style={number === currentPage ? {backgroundColor: '#3d4a57'} : {}}
            key={number}>
            <a onClick={() => paginated(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}