module.exports = (app) => {
	const Ctrl = require('./adresses.controller');

	app.route('/adresses')
		.post(Ctrl.insertOne);

	app.route('/adresses/:id')
		.get(Ctrl.findOne);
}