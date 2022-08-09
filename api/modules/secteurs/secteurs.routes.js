module.exports = (app) => {
	const Ctrl = require('./secteurs.controller');

	app.route('/secteurs/')
		.post(Ctrl.insert);

	app.route('/secteurs/:id')
		.get(Ctrl.findOne)
		.patch(Ctrl.update)
		.delete(Ctrl.delete);

}