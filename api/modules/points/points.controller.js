const points = require('./points.service')

module.exports.findAll = async (req, res) => {
    const point = await  points.findAll();
    res.send(point);
}
module.exports.findOne = async (req, res) => {
    const point = await points.findOne(req.params.id);
    res.send(point);
}
module.exports.insertOne = async (req, res) => {
    const point = await points.insertOne(req.body);
    res.send(point);
}

module.exports.updateOne = async (req, res) => {
    const point = await points.updateOne(req.params.id,req.body);
    return res.send(point);
}

module.exports.deleteOne = async (req, res) => {
    await points.deleteOne(req.params.id);
    res.send(true);
}


