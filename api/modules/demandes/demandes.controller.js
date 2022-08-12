const DemandeService = require('./demandes.service');
module.exports.findAll = async (req, res) => {
	const demande = await DemandeService.findAll();
	res.send(demande);
}

module.exports.findOneById = async (req, res) => {
	const demande = await DemandeService.findOneById(req.params.id);
	if(demande) {
		res.status(200).send(demande);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}

module.exports.insertOne = async (req, res) => {
	const demande = await DemandeService.insertOne(req.body);
	if(demande) {
		res.status(200).send(demande);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}

module.exports.updateOne = async (req, res) => {
	const demande = await DemandeService.updateOne(req.params.id, req.body);
	if(demande) {
		res.status(200).send(demande);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}

module.exports.deleteOne = async (req, res) => {
	 await DemandeService.deleteOne(req.params.id);
	res.send(true);
}
