
const adresses = require('./adresses.service')
module.exports.findAll = async function (req, res){
    const adresse = await adresses.findAll();
    res.send(adresse);
}
module.exports.findOne = async function(req, res){
    const adresse = await adresses.findOne(req.params.id);
    res.send(adresse);
}
module.exports.insertOne = async function(req, res){
    const adresse = await adresses.insertOne(req.body);
    res.send(adresse);
}

module.exports.updateOne = async function(req, res){
    const adresse = await adresses.updateOne(req.params.id,req.body);
    return res.send(adresse);
}

module.exports.delete = async function (req, res){
    await adresses.delete(req.params.id);
    res.send(true);
}


