const {default: mongoose } = require('mongoose');
const { findOne } = require('../secteurs/secteurs.service');
const  Entreprise= require('../model/Shemas').modelEntreprise;
const Demande = require ('../model/Shemas').modelDemande;
const Secteur = require ('../model/Shemas').modelSecteur;
const Service = require ('../model/Shemas').modelService;
const User = require ('../model/Shemas').modelUser;

module.exports.findAll = async () => {
    const result = await Entreprise.find().populate({ 
        path : 'adresse', 
        populate : { 
          path : 'point', 
      }},
     ).populate('user').populate('secteur').populate('services');
    return result;
}

module.exports.findOneById = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Entreprise.findById(id).populate({ 
            path : 'adresse', 
            populate : { 
              path : 'point', 
          }},
         ).populate('user').populate('secteur').populate('services');;
        return result;
    } else {
        return null;
    }
}

module.exports.insertOne = async (data) => {
    const entreprise = await Entreprise.create(data);
    if(entreprise) {
        return entreprise;
    } else {
        return null;
    }
}

module.exports.insertCover = async (id, data) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        console.log(data)
        const  entreprise = await Entreprise.updateOne({_id : id}, { $set: {cover: data.cover}});
        return entreprise;
    } else {
        return null;
    }
}

module.exports.insertProfil = async (id, data) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  entreprise = await Entreprise.updateOne({_id : id}, { $set: {profil: data.profil}});
        return entreprise;
    } else {
        return null;
    }
}

module.exports.updateOne = async (id, data) => {
	const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await Entreprise.findOneAndUpdate({_id : id}, data, {new: true}).populate({ 
            path : 'adresse', 
            populate : { 
              path : 'point', 
          }},
         ).populate('user').populate('secteur').populate('services');

        return result;
    } else {
        return null;
    }
}

module.exports.deleteOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
         await Entreprise.findOneAndDelete()
        return true;
    } else {
        return null;
    }
}

// les services d'une entreprise
module.exports.findServices = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const services = await Entreprise.find({_id: id}, {services: 1, _id: 0}).populate('services');
        return services[0].services;
    } else {
        return null;
    }
}

// Les demandes d'une entreprises
module.exports.findDemandes = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const demandes = await Demande.find({entreprise: id}).populate('service').populate('client');
        return demandes;
    } else {
        return null;
    }
}

module.exports.insertOneService = async (id, data) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const entreprise = await Entreprise.findOneAndUpdate({_id : id}, {$push: {services: data.service}}, {new: true})
        .populate('services');
        return entreprise;
    } else {
        return null;
    }
}

module.exports.search = async ({secteur, service, entreprise}) => {
    let entreprises1 = [];
    let entreprises2 = [];
    let entreprises3 = [];
    if(secteur) {
        const sect = await Secteur.findOne({name: secteur});
        if(sect) {
            const results1 = await Entreprise.find({secteur: sect._id}).populate({
                path : 'adresse', 
                populate : { 
                  path : 'point', 
              }}).populate('services');

            entreprises1 = entreprises1.concat(results1);
        }
    }

    if(service) {
        const serv = await Service.findOne({name: service});
        if(serv) {
            const results2 = await Entreprise.find({services: {$elemMatch: {_id: serv._id}}}).populate({ 
                path : 'adresse', 
                populate : { 
                  path : 'point', 
              }}).populate('services');

            entreprises2 = entreprise2.concat(results2);
        }
    }
    
    if(entreprise) {
        const results3 = await Entreprise.find({name: entreprise}).populate({ 
            path : 'adresse', 
            populate : { 
              path : 'point', 
          }}).populate('services');

        if(results3){
            entreprises3 = entreprises3.concat(results3);
        }

    }

    entreprises3 = entreprises3.concat(entreprises2, entreprises1);
    
    if(entreprises3.length != 0) {
        return entreprises3;
    } else {
        entreprises3 = await Entreprise.find().populate({ 
            path : 'adresse', 
            populate : { 
              path : 'point', 
          }}).populate('services');

        return entreprises3;
    }
}