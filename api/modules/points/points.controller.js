
const points = require('./points.service').modelPoint;

module.exports.findAll = async function (req, res){
    const point = await  points.findAll();
    res.send(point);
}
module.exports.findOne = async function(req, res){
    const point = await points.findOne(req.params.id);
    res.send(point);
}
module.exports.insert = async function(req, res){
    const point = await points.insert(req.body);
    res.send(point);
}

module.exports.update = async function(req, res){
    const point = await points.update(req.params.id,req.body);
    return res.send(point);
}

module.exports.delete = async function (req, res){
    await points.delete(req.params.id);
    res.send(true);
}


