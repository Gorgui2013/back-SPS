module.exports = (app) => {
	const Ctrl = require('./secteurs.controller');

	app.route('/secteurs/')
		.get(Ctrl.findAll);

	app.route('/secteurs/:id/entreprises')
		.get(Ctrl.findEntreprise);
        
	app.route('/secteurs/:id/services')
		.get(Ctrl.findService);
}