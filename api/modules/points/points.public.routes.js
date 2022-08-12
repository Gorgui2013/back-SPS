module.exports = (app) => {
	const Ctrl = require('./points.controller');

	app.route('/points')
		.post(Ctrl.insertOne);

	app.route('/points/:id')
		.get(Ctrl.findOne);
}