module.exports = (app) => {
	const Ctrl = require('./points.controller');

	app.route('/points/')
		.get(Ctrl.findAll)
		.post(Ctrl.insert);

	app.route('/points/:id')
		.get(Ctrl.findOne)
		.patch(Ctrl.update)
		.delete(Ctrl.delete);
}