module.exports = (app) => {
	const Ctrl = require('./adresses.controller');

	app.route('/adresses/')
		.get(Ctrl.findAll);

	app.route('/adresses/:id')
		.patch(Ctrl.updateOne)
		.delete(Ctrl.delete);
}