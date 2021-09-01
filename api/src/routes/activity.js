//>>
const { Router } = require('express');
const { addActivity } = require('../controllers');
const router = Router();

router.post('/activity', addActivity);

module.exports = router;
//<<
