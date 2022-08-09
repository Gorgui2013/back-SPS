module.exports = (app) => {
	const Ctrl = require('./services.controller');

	app.route('/services')
		.get(Ctrl.findAll)
	
	app.route('/services/:id/entreprises')
		.get(Ctrl.findEntreprises)
}