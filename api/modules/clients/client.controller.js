const ClientService = require('./client.service');
module.exports.findAll = async (req, res) => {
	const client = await ClientService.findAll();
	res.send(client);
}

module.exports.findOneById = async (req, res) => {
	const client = await ClientService.findOneById(req.params.id);
	if(client) {
		res.status(200).send(client);
	} else {
		res.status(401).json({ message: "Not Found" });
	}
}

module.exports.insertOne = async (req, res) => {
	const client = await ClientService.insertOne(req.body);
	if(client) {
		res.status(200).send(client);
	} else {
		res.status(401).json({ message: "Not Found" });
	}
}

module.exports.updateOne = async (req, res) => {
	const client = await ClientService.updateOne(req.params.id, req.body);
	if(client) {
		res.status(200).send(client);
	} else {
		res.status(401).json({ message: "Not Found" });
	}
}

module.exports.deleteOne = async (req, res) => {
	await ClientService.deleteOne(req.params.id);
	res.send(true);
}
module.exports.findDemandes = async (req, res) => {
	const demandes = await ClientService.findDemandes(req.params.id);
	if(demandes) {
		res.status(200).send(demandes);
	} else {
		res.status(401).json({ message: "Not Found" });
	}
}