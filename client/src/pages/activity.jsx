import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getCountries } from '../redux/actions';
import styles from './Activity.module.css';

//Validaciones:
function validate(input){
  const errors = {};
  if(!input.name) errors.name = 'An activity name is required';
  else if (!input.duration) errors.duration = "Duration is required";
  else if (input.duration < 1 || input.duration > 24) errors.duration = "An activity can last between 1 and 24 hours";
  else if (!input.difficulty) errors.difficulty = 'Please select difficulty level';
  else if (input.difficulty < 1 || input.difficulty > 5) errors.difficulty = "Difficulty level can last between 1 and 5";
  else if (!input.season) errors.season = "Please select a season";
  else if (!input.countryId.length) errors.countryId = "At least one country is required";
  return errors;
}

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
  const [errors, setErrors] = useState({});
/*
  "countryId": ["URY","ARG","VEN"],
  "name": "sky",
  "difficulty": "3",
  "duration": "mucho",
  "season": "winter"
*/
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
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  //Manejo de radio difficulty:
  function handleRadio(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
    }
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  //Manejo de select:
  function handleSelect(e) {
    setInput({
      ...input,
      countryId: [...input.countryId, e.target.value]
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  //Manejo de submit:
  function handleSubmit(e){
    console.log(input);
    if(
      input.name &&
      input.duration &&
      input.difficulty &&
      input.season &&
      input.countryId.length //countryId es un array
    ) {
      e.preventDefault();
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
    } else {
      e.preventDefault();
      alert('All fields must be completed')
    }
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
        
        <label className={styles.item}>Activity name: </label>
        <input 
          type='text'
          value={input.name}
          name='name'
          onChange={(e) => handleChange(e)}
          placeholder='Activity name'
        />
        {errors.name && (<p className='error'>{errors.name}</p>)}

        <label className={styles.item}>Activity duration: </label>
        <input type='text'
          value={input.duration}
          name='duration'
          onChange={(e) => handleChange(e)}
          placeholder='1 to 24 hours'
        />
        {errors.duration && (<p className='error'>{errors.duration}</p>)}

        <label className={styles.item}>Activity difficulty: </label>
        <input type='number'
          value={input.difficulty}
          name='difficulty'
          onChange={(e) => handleChange(e)}
          placeholder='1 to 5'
        />
        {errors.difficulty && (<p className='error'>{errors.difficulty}</p>)}

        <label className={styles.item}>Season: </label>
        <div>
          <span>Summer</span>
          <input 
            type='radio' 
            name='season' 
            value='summer' 
            onChange={e => handleRadio(e)}
          />
          <span className={styles.radioItem}>Winter</span>
          <input 
            type='radio' 
            name='season' 
            value='winter' 
            onChange={e => handleRadio(e)}
          />
          <span className={styles.radioItem}>Spring</span>
          <input 
            type='radio' 
            name='season' 
            value='spring' 
            onChange={e => handleRadio(e)}
          />
          <span className={styles.radioItem}>Autumn</span>
          <input 
            type='radio' 
            name='season' 
            value='autumn'
            onChange={e => handleRadio(e) }
          />
        </div>
        {errors.season && (<p className='error'>{errors.season}</p>)}
        
        <label className={styles.item}>Choose countries: </label>
        <select className={styles.countries} onChange={e => handleSelect(e)}>
        {allCountries.map(c => (
          <option value={c.id} key={c.id}>{c.name}</option>
        ))}
        </select>
        {errors.countryId && (<p className='error'>{errors.countryId}</p>)}

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
