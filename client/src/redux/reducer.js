const initialState = {
	countries: [],
	//*****Guardamos una copia para entregar a los filtrados:
	allCountries: []
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_COUNTRIES':
			return {
				...state,
				countries: action.payload,
				//*****Guardamos una copia para entregar a los filtrados:
				allCountries: action.payload
			};

		case 'FILTER_BY_REGION':
			const allCountries = state.allCountries;
			let regionFiltered;
			if (action.payload === 'All') regionFiltered = allCountries;
			else
				regionFiltered = allCountries.filter(
					(c) => c.region === action.payload
				);
			return {
				...state,
				countries: regionFiltered
			};

		case 'ORDER_BY_NAME':
			let orderedCountriesByName;
			if (action.payload === 'Ascendent') {
				orderedCountriesByName = state.countries.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
					return 0;
				});
			}
			if (action.payload === 'Descendent') {
				orderedCountriesByName = state.countries.sort((a, b) => {
					if (a.name < b.name) return 1;
					if (a.name > b.name) return -1;
					return 0;
				});
			}
			return {
				...state,
				countries: orderedCountriesByName
			};

		case 'ORDER_BY_POPULATION':
			let orderedCountriesByPopulation;
			if (action.payload === 'Ascendent') {
				orderedCountriesByPopulation = state.countries.sort(
					(a, b) => a.population - b.population
				);
			}
			if (action.payload === 'Descendent') {
				orderedCountriesByPopulation = state.countries.sort(
					(a, b) => b.population - a.population
				);
			}
			return {
				...state,
				countries: orderedCountriesByPopulation
			};

		case 'GET_COUNTRIES_BY_NAME':
			return {
				...state,
				countries: action.payload
			};

		default:
			return state;
	}
}
