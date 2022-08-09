
const secteurs = require('./secteurs.service');

module.exports.findAll = async function  (req, res){
    const secteur = await secteurs.findAll();
    res.send(secteur);
}
module.exports.findOne = async function(req, res){
    const secteur = await secteurs.findOne(req.params.id);
    res.send(secteur);
}
module.exports.insert = async  function(req, res){
    const secteur = await secteurs.insert(req.body);
    res.send(secteur);
}

module.exports.update = async function(req, res){
    const secteur = await secteurs.update(req.params.id,req.body);
    return res.send(secteur);
}

module.exports.delete = async function (req, res){
  await  secteurs.delete(req.params.id);
    res.send(true);
}
module.exports.findEntreprise = async function (req, res){
   const entreprises = await secteurs.findEntreprise(req.params.id);
    res.send(entreprises);
}
module.exports.findService = async function (req, res){
    const entreprises = await secteurs.findService(req.params.id);
     res.send(entreprises);
 }

