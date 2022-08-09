const DemandeService = require('./demandes.service');
module.exports.findAll = async (req, res) => {
	const demande = await DemandeService.findAll();
	res.send(demande);
}

module.exports.findOneById = async (req, res) => {
	const demande = await DemandeService.findOneById(req.params.id);
	res.send(demande);
}

module.exports.insertOne = async (req, res) => {
	const demande = await DemandeService.insertOne(req.body);
	res.send(demande);
}

module.exports.updateOne = async (req, res) => {
	const demande = await sDemandeService.updateOne(req.params.id, req.body);
	res.send(demande);
}

module.exports.deleteOne = async (req, res) => {
	 await DemandeService.deleteOne(req.params.id);
	res.send(true);
}
