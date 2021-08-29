//>>
const axios = require('axios');
const { Country } = require('./db');
const URL_ALL = 'https://restcountries.eu/rest/v2/all';

async function dbLoad(_req, res) {
	try {
		{
			const apiCountries = await axios.get(URL_ALL);
			const dbCountries = apiCountries.data.map((c) => {
				return {
					id: c.alpha3Code,
					name: c.name,
					alpha3Code: c.alpha3Code,
					flag: c.flag,
					region: c.region,
					capital: c.capital,
					subregion: c.subregion,
					area: c.area,
					population: c.population
				};
			});
			dbCountries.forEach(async (c) => {
				await Country.create({
					id: c.id,
					name: c.name,
					alpha3Code: c.alpha3Code,
					flag: c.flag,
					region: c.region,
					capital: c.capital,
					subregion: c.subregion,
					area: c.area,
					population: c.population
				});
			});
		}
	} catch (error) {
		res.status(500).json({ error: 'Server Error' });
	}
}

module.exports = { dbLoad };
//<<
