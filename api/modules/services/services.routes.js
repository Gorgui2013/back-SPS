const upload = require('../../../uploadMiddleware');

module.exports = (app) => {
	const Ctrl = require('./services.controller');

	app.route('/services')
		.post(upload.single('image'), Ctrl.insertOne);

	app.route('/services/:id')
		.get(Ctrl.findOneById)
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne);

}