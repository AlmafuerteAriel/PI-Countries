//>>
const { filterByName, filterById } = require('./countries');
const { addActivity } = require('./activity');
const { dbLoader } = require('./dbLoader');

module.exports = {
	filterByName,
	filterById,
	addActivity,
	dbLoader
};
//<<
