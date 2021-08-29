//>>
const { Router } = require('express');
const { getCountries } = require('../controllers/countries');
const router = Router();

router.get('/countries', getCountries);

module.exports = router;
//<<
