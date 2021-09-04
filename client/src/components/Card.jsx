import React from 'react';
import styles from './Card.module.css';

export function Card ({flag, name, region}) {
  return (
    <div>
      <img src={flag} alt="{name}" />
      <h1>{name}</h1>
      <h2>{region}</h2>
    </div>
  )
}