module.exports = (app) => {
	const Ctrl = require('./client.controller');

	app.route('/clients')
		.post(Ctrl.insertOne);

	app.route('/clients/:id')
		.patch(Ctrl.updateOne)
}