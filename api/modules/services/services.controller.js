const serviceService = require('./services.service');
module.exports.findAll = async (req, res) => {
	const service = await serviceService.findAll();
	res.send(service);
}

module.exports.findOneById = async (req, res) => {
	const service = await serviceService.findOneById(req.params.id);
	res.send(service);
}

module.exports.insertOne = async (req, res) => {
	const service = await serviceService.insertOne(req.body);
	res.send(service);
}

module.exports.updateOne = async (req, res) => {
	const service = await serviceService.updateOne(req.params.id, req.body);
	res.send(service);
}

module.exports.deleteOne = async (req, res) => {
	 await serviceService.deleteOne(req.params.id);
	res.send(true);
}

module.exports.findEntreprises = async (req, res) => {
	const result = await serviceService.findEntreprises(req.params.id);
	res.send(result);
}