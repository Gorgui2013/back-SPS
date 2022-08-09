module.exports = (app) => {
	const Ctrl = require('./client.controller');

	app.route('/clients')
		.get(Ctrl.findAll);

	app.route('/clients/:id')
		.get(Ctrl.findOneById)
		.put(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);

	app.route('/clients/:id/demandes')
		.get(Ctrl.findDemandes);
}