const { Activity, Country } = require('../db.js');

const addActivity = async function (req, res) {
	try {
		const { name, difficulty, duration, season, countryId } = req.body;
		let newActivity = await Activity.findOrCreate({
			where: {
				name: name,
				difficulty: difficulty,
				duration: duration,
				season: season
			}
		});
		//countryId = [Id1, Id2, ...]
		for (let i = 0; i < countryId.length; i++) {
			const match = await Country.findOne({
				where: {
					id: countryId[i]
				}
			});

			await newActivity[0].addCountry(match);
		}
		res.json({ msg: 'Activity created' });
	} catch (error) {
		res.send({ msg: 'Server Error' });
	}
};

/*
const addActivity = async function (req, res) {
	const { countryId, name, difficulty, duration, season } = req.body;
	if (!countryId || !name || !difficulty || !duration || !season) {
		return res.status(404).json({ msg: 'Insufficient data' });
	}
	const activityExists = await Activity.findOne({
		where: { name: name }
	});
	if (activityExists) {
		return res.json({ msg: 'The activity already exists' });
	}
	try {
		// Insertamos nuevo registro en db
		const newActivity = await Activity.create({
			name,
			difficulty,
			duration,
			season
		});
		console.log('Activity Created');
		//>> Conectamos ambas tablas
		await newActivity.setCountries(countryId);
		const matchCountry = await Country.findAll({
			where: { id: countryId },
			include: [Activity]
		});
		await newActivity.addCountries(matchCountry);
		return res.send(matchCountry);
		//<<
		//res.json({ msg: 'Activity Created' });
	} catch {
		res.send(500).json({ msg: 'Server error' });
	}
};
*/

module.exports = {
	addActivity
};
