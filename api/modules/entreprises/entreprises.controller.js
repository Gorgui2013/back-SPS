const EntrepriseService = require('./entreprises.service');
module.exports.findAll = async (req, res) => {
	const entreprise = await EntrepriseService.findAll();
	res.send(entreprise);
}

module.exports.findOneById = async (req, res) => {
	const entreprise = await EntrepriseService.findOneById(req.params.id);
	if(entreprise) {
		res.status(200).send(entreprise);
	} else {
		res.status(401).send({ message: "Not Found" });
	}
}

module.exports.insertOne = async (req, res) => {
	const entreprise = await EntrepriseService.insertOne(req.body);
	if(entreprise) {
		res.status(200).send(entreprise);
	} else {
		res.status(401).send({ message: "Not Found" });
	}
}

module.exports.updateOne = async (req, res) => {
	const entreprise = await EntrepriseService.updateOne(req.params.id, req.body);
	if(entreprise) {
		res.status(200).send(entreprise);
	} else {
		res.status(401).send({ message: "Not Found" });
	}
}

module.exports.deleteOne = async (req, res) => {
	 await EntrepriseService.deleteOne(req.params.id);
	res.send(true);
}
module.exports.findServices = async (req, res) => {
	const services = await EntrepriseService.findServices(req.params.id);
	if(services) {
		res.status(200).send(services);
	} else {
		res.status(401).send({ message: "Not Found" });
	}
}
module.exports.findDemandes = async (req, res) => {
	const demandes = await EntrepriseService.findDemandes(req.params.id);
	if(demandes) {
		res.status(200).send(demandes);
	} else {
		res.status(401).send({ message: "Not Found" });
	}
}

module.exports.search = async (req, res) => {
	const entreprises = await EntrepriseService.search(req.query);
	if(entreprises) {
		res.status(200).send(entreprises);
	} else {
		res.status(200).send({ message: "Pas de résultat" });
	}
}
