const serviceService = require('./services.service');

module.exports.findAll = async (req, res) => {
	const service = await serviceService.findAll();
	res.send(service);
}

module.exports.findOneById = async (req, res) => {
	const service = await serviceService.findOneById(req.params.id);
	if(service) {
		res.status(200).send(service);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}

module.exports.insertOne = async (req, res) => {
	console.log(req.body)
	const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please upload a file.' });
  } else {
		const service = await serviceService.insertOne({...req.body, image: file.path.replace('public','')});
		if(service) {
			res.status(200).send(service);
		} else {
			res.status(404).send({ message: "Not Found" });
		}
	}
}

module.exports.updateOne = async (req, res) => {
	const service = await serviceService.updateOne(req.params.id, req.body);
	if(service) {
		res.status(200).send(service);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}

module.exports.deleteOne = async (req, res) => {
	 await serviceService.deleteOne(req.params.id);
	res.send(true);
}

module.exports.findEntreprises = async (req, res) => {
	const result = await serviceService.findEntreprises(req.params.id);
	if(result) {
		res.status(200).send(result);
	} else {
		res.status(404).send({ message: "Not Found" });
	}
}