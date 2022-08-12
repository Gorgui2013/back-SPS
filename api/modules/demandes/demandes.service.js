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
    } else {
        return null;
    }
}

module.exports.insertOne = async (data) => {
    const demande = await Demande.create({...data, etat: 1});
    if(demande) {
        return demande.populate('client','service','entreprise');
    } else {
        return null;
    }
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Demande.findOneAndUpdate({_id : id}, data, {new: true}).populate('client','service','entreprise');
        return result;
    } else {
        return null;
    }
}

module.exports.deleteOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Demande.findOneAndDelete()
        return true;
    } else {
        return null;
    }
}