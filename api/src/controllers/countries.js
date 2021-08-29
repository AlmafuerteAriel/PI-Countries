//>>
const { Activity, Country } = require('../db.js');
const e = require('express');

const getCountries = async (req, res) => {
	res.send('Countries List');
};

module.exports = {
	getCountries
};
//<<
