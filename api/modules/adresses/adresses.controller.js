const adresses = require('./adresses.service')

module.exports.findAll = async (req, res) => {
    const adresse = await adresses.findAll();
    res.send(adresse);
}
module.exports.findOne = async (req, res) => {
    const adresse = await adresses.findOne(req.params.id);
    res.send(adresse);
}
module.exports.insertOne = async (req, res) => {
    const adresse = await adresses.insertOne(req.body);
    res.send(adresse);
}

module.exports.updateOne = async (req, res) => {
    const adresse = await adresses.updateOne(req.params.id,req.body);
    return res.send(adresse);
}

module.exports.delete = async (req, res) => {
    await adresses.delete(req.params.id);
    res.send(true);
}


