const { default: mongoose } = require('mongoose');

const Adress = require('../model/Shemas').modelAdress;

module.exports.findAll = async () => {
    const result = await Adress.find().populate('points');
    return result;
}

module.exports.findOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Adress.findOne({_id : id}).populate('points');
        return result;
    }
}

module.exports.insertOne = async (data) => {
    const result = await Adress.create(data);
    return result;
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Adress.findOneAndUpdate({_id : id}, data, {new: true}).populate('points');
        return result;
    }
}

module.exports.delete = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Adress.findOneAndDelete({_id : id});
        return true;
    }
}