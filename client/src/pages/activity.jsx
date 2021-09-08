import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getCountries } from '../redux/actions';
import styles from './Activity.module.css';

export function Activity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCountries = useSelector((state) => state.allCountries);
  const [input, setInput] = useState({
    name: "",
    difficulty:"",
    duration:"",
    season:"",
    countryId: []
  })

  //Validaciones:
  function validate(input, countryId){
    const errors = {};
    if(!input.name) errors.name = 'A name is required';
    else if (!input.difficulty) errors.difficulty = 'Difficulty is required';
    else if (!input.duration) errors.duration = "Duration is required";
    else if (input.duration>24) errors.duration = "Duration must be at most 24 hours";
    else if (!input.season) errors.season = "Season is required";
    else if (!countryId.length) errors.countryId = "Country is required";
    return errors;
  }

  //Traemos el listado de paíces:
  useEffect(() => {
    dispatch(getCountries());
    }, []);

  //Manejo de inputs:
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  //Manejo de radius difficulty:
  function handleDifficulty(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        difficulty: e.target.value
      })
    }
  }

  //Manejo de radius season:
  function handleSeason(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        season: e.target.value
      })
    }
  }

  //Manejo de select:
  function handleSelect(e) {
    setInput({
      ...input,
      countryId: [...input.countryId, e.target.value]
    })
  }

  //Manejo de submit:
  function handleSubmit(e){
    e.preventDefault();
    console.log(input);
    dispatch(addActivity(input));
    alert('Activty created');
    setInput({
      name: '',
      difficulty:'',
      duration:'',
      season:'',
      countryId: []
    });
    //Redirigimos a Home:
    history.push('/home');
  }

  //Borrar paíces seleccionados:
  const remove = (e) => {
    setInput({
      ...input,
      countryId: input.countryId.filter(country => country !== e.target.id)
    })
    e.preventDefault();
  };

  return(
    <div className={styles.content}>
      <h1>Create an activity:</h1>
      <Link to='/home'><button>Home</button></Link>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        
        <label className={styles.item}>Activity: </label>
        <input 
          type='text'
          value={input.name}
          name='name'
          onChange={(e) => handleChange(e)}
          placeholder='Activity name'
        />

        <label className={styles.item}>Duration: </label>
        <input type='text'
          value={input.duration}
          name='duration'
          onChange={(e) => handleChange(e)}
          placeholder='1 to 24 hours'
        />

        <label className={styles.item}>Difficulty: </label>
        <label>
          <span className={styles.radioItem}>1</span>
          <input 
            type='radio' 
            name='difficulty' 
            value='1' 
            onChange={e => handleDifficulty(e)}
          />
          <span className={styles.radioItem}>2</span>
          <input 
            type='radio' 
            name='difficulty' 
            value='2' 
            onChange={e => handleDifficulty(e)}
          />
          <span className={styles.radioItem}>3</span>
          <input 
            type='radio' 
            name='difficulty' 
            value='3' 
            onChange={e => handleDifficulty(e)}
          />
          <span className={styles.radioItem}>4</span>
          <input 
            type='radio' 
            name='difficulty' 
            value='4' 
            onChange={e => handleDifficulty(e)}
          />
          <span className={styles.radioItem}>5</span>
          <input 
            type='radio' 
            name='difficulty' 
            value='5' 
            onChange={e => handleDifficulty(e)}
          />
        </label>
        
        <label className={styles.item}>Season: </label>
        <label>
          <span>Summer</span>
          <input 
            type='radio' 
            name='season' 
            value='summer' 
            onChange={e => handleSeason(e)}
          />
          <span className={styles.radioItem}>Winter</span>
          <input 
            type='radio' 
            name='season' 
            value='winter' 
            onChange={e => handleSeason(e)}
          />
          <span className={styles.radioItem}>Spring</span>
          <input 
            type='radio' 
            name='season' 
            value='spring' 
            onChange={e => handleSeason(e)}
          />
          <span className={styles.radioItem}>Autumn</span>
          <input 
            type='radio' 
            name='season' 
            value='autumn' 
            onChange={e => handleSeason(e) }
          />
        </label>
        
        <label className={styles.item}>Countries: </label>
        <select className={styles.countries} onChange={e => handleSelect(e)}>
        {allCountries.map(c => (
          <option value={c.id} key={c.id}>{c.name}</option>
        ))}
        </select>

        <ul>
          {input.countryId.map(c => (
            //<li key={c}>{c} onClick={remove} id={c}>X</button></li>
            <li key={c}>{c} <button onClick={remove} id={c}>X</button></li>
          )
          )}
        </ul>

        <button type='submit'>Create Activity</button>

      </form>
    </div>
  )
}
