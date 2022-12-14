const { default: mongoose } = require('mongoose');

const Point = require('../model/Shemas').modelPoint;

module.exports.findAll = async () => {
    const result = await Point.find();
	return result;
}

module.exports.findOne = async (id) => {
	const valid_id = mongoose.Types.ObjectId(id);
        if(valid_id){
        const result = await Point.findOne({_id : id});
        return result;
    }
    else return 'can not find'
}

module.exports.insertOne = async (data) => {
	const result = await Point.create(data);
    return result;
}

module.exports.updateOne = async  (id, data) => {
    const valid_id = mongoose.Types.ObjectId.isValid(id);
        if(valid_id){
            const result = await Point.findOneAndUpdate({_id : id}, data, {new: true});
            return result;
        }
	    else return 'Update not done';
}

module.exports.deleteOne = async (id) => {
	const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
       await Point.findOneAndDelete({_id : id});
        return true;
    }
    else return false;
}