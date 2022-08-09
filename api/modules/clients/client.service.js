const {default: mongoose } = require('mongoose');
const  Client= require('../model/Shemas').modelClient;
const  Demande= require('../model/Shemas').modelDemande;
module.exports.findAll = async () => {
    const result = await Client.find().populate('user');
    return result;
}

module.exports.findOneById = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Client.findById(id).populate('user');
        return result;
    } else {
        return null;
    }
}

module.exports.insertOne = async (data) => {
    const client = await Client.create(data);
    return client;
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Client.findOneAndUpdate({_id : id}, data, {new: true}).populate('user');
        return result;
    } else {
        return null;
    }
}

module.exports.deleteOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Client.findOneAndDelete()
        return true;
    } else {
        return null;
    }
}

//les demandes d'un client

module.exports.findDemandes = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const demandes = await Demande.find({client : id}).populate('service').populate('client');;
        return demandes;
    } else {
        return null;
    }
}
