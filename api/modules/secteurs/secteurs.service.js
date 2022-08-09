
const { default: mongoose } = require('mongoose');
const Secteur = require('../model/Shemas').modelSecteur;
const Entreprise = require('../model/Shemas').modelEntreprise;
const Service = require('../model/Shemas').modelService;
module.exports.findAll = async () => {
    const result = await Secteur.find().sort({name: 1});
    return result;
}

module.exports.findOne = async (id) => {
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
        const result = await Secteur.findOne({_id : id});
        return result;
    }
}

module.exports.insert = async (data) => {
    await Secteur.create(data);
}

module.exports.update = async (id, data) => {
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
        const result = await Secteur.findOneAndUpdate({_id : id}, data, {new: true});
        return result;
    }
	else return 'Update not done';
}

module.exports.delete = async  (id) => {
	const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
        await Secteur.findOneAndDelete({_id : id});
        return true;
    }
    else return false;
}

//les entreprises d'un secteur
module.exports.findEntreprise = async (id) =>{
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
        const result = await Entreprise.find({secteur : id}).populate({ 
            path : 'adresse', 
            populate : { 
              path : 'points', 
          }},
         ).populate('user').populate('secteur').populate('service');
        return result ;
    }
    return 'Zéro entreprise trouvée'
}
//les services d'un secteur
module.exports.findService = async (id) =>{
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if(valid_id){
        const result = await Entreprise.find({secteur : id}).populate('service');
        //({name : 1, description: 0, email: 0,phone : 0,user: 0,secteur:0}
        const service = [];
            for await (const i of result){
                service.push(i.service);
            }
        return service ;
    }
    return 'Zéro service trouvé'
}