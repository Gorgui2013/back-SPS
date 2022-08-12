const upload = require('../../../uploadMiddleware');

module.exports = (app) => {
	const Ctrl = require('./entreprises.controller');

	app.route('/entreprises/:id')
		.patch(Ctrl.updateOne)
		.delete(Ctrl.deleteOne)
		.post(Ctrl.insertOneService);

	app.route('/entreprises/:id/cover')
		.post(upload.single('cover'), Ctrl.insertCover);

	app.route('/entreprises/:id/profil')
		.post(upload.single('profil'), Ctrl.insertProfil);

	app.route('/entreprises/:id/demandes')
		.get(Ctrl.findDemandes)
}