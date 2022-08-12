const UsersService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require ('../model/Shemas').modelUser;
const Entreprise = require ('../model/Shemas').modelEntreprise;
const Client = require ('../model/Shemas').modelClient;

module.exports.register = async ({ username, password, role }) => {
    const salt = await bcrypt.genSalt(10);
    const encriptPassword = await bcrypt.hash(password, salt);
    const user = await UsersService.insertOne({ username, encriptPassword, role});
    if(user) {
        delete user.password
        return user;
    } else {
        null;
    }
    // user.save().then((data) => res.status(201).send(data)).catch((error) => res.status().send(data));
}

module.exports.login = async ({ username, password }) => {
    let user = await UsersService.findOneByUsername(username);

    if(!user) {
        return null;
    } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            user = { ...user.toObject() };
            let info;
            if(user.role === 'USER') {
                info = await Client.find({user: user._id});
            }
            if(user.role === 'COMPANY') {
                info = await Entreprise.find({user: user._id}).populate({path:'adresse', populate: {path: 'point'}}).populate('secteur');
            }
            delete user.password;
            const token = jwt.sign(user, 'digitalAfricaKey', { expiresIn: 60 * 60 });
            return { user, token, info};
        } else {
            return null;
        }
    }
}

module.exports.validation = async ({ username, code }) => {
    let user = await UsersService.validation(username, code);
    if(!user) {
        return null;
    } else {
        return user;
    }
}

module.exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'digitalAfricaKey', (error, decoded) => {
            if(error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        })
    })
}

module.exports.listUsers = async () => {
    return await UsersService.list();
}
