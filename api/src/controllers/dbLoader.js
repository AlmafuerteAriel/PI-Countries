const axios = require('axios');
const { Country } = require('../db');
const { URL_ALL } = require('../consts');

const dbLoader = async function (_req, res) {
	try {
		{
			const apiCountries = await axios.get(URL_ALL);
			const dbCountries = apiCountries.data.map((c) => {
				return {
					alpha3Code: c.alpha3Code,
					name: c.name,
					flag: c.flag,
					region: c.region,
					capital: c.capital,
					subregion: c.subregion ? c.subregion : 'No information',
					area: c.area ? c.area : 'No information',
					population: c.population ? c.population : 'No information'
				};
			});
			dbCountries.map(async (c) => {
				await Country.create({
					id: c.alpha3Code,
					name: c.name,
					flag: c.flag,
					region: c.region,
					capital: c.capital,
					subregion: c.subregion,
					area: c.area,
					population: c.population
				});
			});
			console.log('DB Loaded');
		}
	} catch (error) {
		res.status(500).json({ msg: 'Server Error' });
	}
};

module.exports = { dbLoader };
