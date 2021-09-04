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
