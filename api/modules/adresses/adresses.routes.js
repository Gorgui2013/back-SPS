module.exports = (app) => {
	const Ctrl = require('./adresses.controller');

	app.route('/adresses/')
		.get(Ctrl.findAll)
		.post(Ctrl.insertOne);

	app.route('/adresses/:id')
		.get(Ctrl.findOne)
		.patch(Ctrl.updateOne)
		.delete(Ctrl.delete);
}