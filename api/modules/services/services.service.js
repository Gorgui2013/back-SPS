const e = require('express');
const {default: mongoose } = require('mongoose');
const  Service = require('../model/Shemas').modelService;
const Entreprise = require('../model/Shemas').modelEntreprise;
module.exports.findAll = async () => {
    const result = await Service.find();
    return result;
}

module.exports.findOneById = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Service.findById(id);
        return result;
    } else {
        return null;
    }
}

module.exports.insertOne = async (data) => {
    const service = await Service.create(data);
    return service;
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Service.findOneAndUpdate({_id : id}, data, {new: true});
        return result;
    } else {
        return null;
    }
}

module.exports.deleteOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Service.findOneAndDelete({_id : id})
        return true;
    } else {
        return null;
    }
}
// les entreprises qui offre un service donné

module.exports.findEntreprises = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
        if(valid_id){
            const result = await Entreprise.find().populate({ 
                path : 'adresse', 
                populate : { 
                  path : 'points', 
              }},
             ).populate('user').populate('secteur').populate('service');;
            const entreprises =[];
            for await (const entreprise of result){
                for await(const service_id of entreprise.service) {
                    let s_obj = new String(service_id)
                    if(s_obj.includes(id)) {
                       await entreprises.push(entreprise);
                    }
                }
            }
           
            return entreprises;
        }
        return 'Pas d\'entreprise'
}