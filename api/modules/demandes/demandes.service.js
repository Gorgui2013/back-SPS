const {default: mongoose } = require('mongoose');
const  Demande = require('../model/Shemas').modelDemande;

module.exports.findAll = async () => {
    const result = await Demande.find().populate('client','service','entreprise');
    return result;
}

module.exports.findOneById = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Demande.findById(id).populate('client','service','entreprise');
        return result;
    }
}

module.exports.insertOne = async (data) => {
    await (await Demande.create(data)).populate('client','service','entreprise');
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Demande.findOneAndUpdate({_id : id}, data, {new: true}).populate('client','service','entreprise');
        return result;
    }
}

module.exports.deleteOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Demande.findOneAndDelete()
        return true;
    }
}