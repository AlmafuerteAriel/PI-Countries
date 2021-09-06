import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountriesByName } from "../redux/actions";

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
    <div>
      <input type="text"
      placeholder='Search Countries...'
      onChange={(e) => handlerInputChange(e)}
      />
      <button type='submit' onClick={
        (e) => { handlerSubmit(e) }
      }>Search</button>
    </div>
  )
}