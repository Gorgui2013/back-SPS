const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, dropDups: true },
    password: { type: String, required: true },
    role: { type: String },
    statut: { type: Boolean },
    code: { type: Number },
}, { timestamps: true });

const modelUser = mongoose.model('user', userSchema);
module.exports.modelUser = modelUser;

const ClientSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    sexe: { type: String, enum: ['M', 'F'] },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    user:{ type: mongoose.Schema.Types.ObjectId,ref:'user' },
}, { timestamps: true });

const modelClient = mongoose.model('client', ClientSchema);
module.exports.modelClient = modelClient;

// Demande Schema
const DemandeSchema = new mongoose.Schema({
      object: { type: String },
      message: { type: String },
      dateExecution: { type: Date },
      etat: { type: Number, default: 0 },
      client: { type: mongoose.Schema.Types.ObjectId, ref: "client"},
      service: { type: mongoose.Schema.Types.ObjectId, ref: "service"},
      entreprise: { type: mongoose.Schema.Types.ObjectId, ref: "entreprise"},
}, { timestamps: true });

const modelDemande = mongoose.model('demande', DemandeSchema);
module.exports.modelDemande = modelDemande;

// point Schema
const Point = new mongoose.Schema({
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
});

const modelPoint = mongoose.model('points', Point);
module.exports.modelPoint = modelPoint;

// Adresse Schema
const AdresseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    point: { type: mongoose.Schema.Types.ObjectId, ref: 'points' },
});

const modelAdress = mongoose.model('adresse', AdresseSchema);
module.exports.modelAdress = modelAdress;

// Secteurs Schema
const SecteurSchema = new mongoose.Schema({
    name: { type: String }
}, { timestamps: true });

const modelSecteur = mongoose.model('secteur', SecteurSchema);
module.exports.modelSecteur = modelSecteur;

// services schema
const ServiceSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String, default: '/images/service.png' },
}, { timestamps: true });
const modelService = mongoose.model('service', ServiceSchema);
module.exports.modelService = modelService;

// Entreprise schma
const EntrepriseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true, unique:true, dropDups: true },
    phone: { type: String, required: true },
    cover: { type: String, default: '/images/cover.png' },
    profil: { type: String, default: '/images/company.webp' },
    user:{ type: mongoose.Schema.Types.ObjectId,ref:'user' },
    secteur:{ type: mongoose.Schema.Types.ObjectId,ref:'secteur' },
    services:[{ type: mongoose.Schema.Types.ObjectId,ref:'service' }],
    adresse:{ type: mongoose.Schema.Types.ObjectId,ref:'adresse' },
}, { timestamps: true });

const modelEntreprise = mongoose.model('entreprise', EntrepriseSchema);
module.exports.modelEntreprise = modelEntreprise;






