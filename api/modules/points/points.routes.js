module.exports = (app) => {
	const Ctrl = require('./points.controller');

	app.route('/points')
		.get(Ctrl.findAll);

	app.route('/points/:id')
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);
}