import axios from 'axios';

export function getCountries() {
	return async function (dispatch) {
		var allCountries = await axios('http://localhost:3001/countries');
		return dispatch({
			type: 'GET_COUNTRIES',
			payload: allCountries.data
		});
	};
}

export function filterCountriesByRegion(payload) {
	return {
		type: 'FILTER_BY_REGION',
		payload
	};
}

export function orderCountriesByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload
	};
}

export function orderCountriesByPopulation(payload) {
	return {
		type: 'ORDER_BY_POPULATION',
		payload
	};
}

export function getCountriesByName(payload) {
	return async function (dispatch) {
		try {
			const countriesByName = await axios.get(
				`http://localhost:3001/countries?name=${payload}`
			);
			return dispatch({
				type: 'GET_COUNTRIES_BY_NAME',
				payload: countriesByName.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}
//>>Funcón para agregar post a la tabla "activity"
export function addActivity(payload) {
	return async function (dispatch) {
		const response = await axios.post(
			'http://localhost:3001/activity',
			payload
		);
		return response;
	};
}
