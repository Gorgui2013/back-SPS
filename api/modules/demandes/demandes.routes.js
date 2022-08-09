module.exports = (app) => {
	const Ctrl = require('./demandes.controller');

	app.route('/demandes')
		.get(Ctrl.findAll)
		.post(Ctrl.insertOne);

	app.route('/demandes/:id')
		.get(Ctrl.findOneById)
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);
}
