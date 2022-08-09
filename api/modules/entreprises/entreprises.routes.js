module.exports = (app) => {
	const Ctrl = require('./entreprises.controller');

	app.route('/entreprises/:id')
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);

	app.route('/entreprises/:id/demandes')
		.get(Ctrl.findDemandes)
}