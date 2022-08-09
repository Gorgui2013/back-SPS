module.exports = (app) => {
	const Ctrl = require('./services.controller');

	app.route('/services')
		.post(Ctrl.insertOne);

	app.route('/services/:id')
		.get(Ctrl.findOneById)
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);

}