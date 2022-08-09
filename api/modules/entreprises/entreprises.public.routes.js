module.exports = (app) => {
	const Ctrl = require('./entreprises.controller');

	app.route('/search')
		.get(Ctrl.search)

	app.route('/entreprises')
		.get(Ctrl.findAll)
		.post(Ctrl.insertOne);

	app.route('/entreprises/:id')
		.get(Ctrl.findOneById)
		.patch(Ctrl.updateOne);

	app.route('/entreprises/:id/services')
		.get(Ctrl.findServices);
}