const User = require('../model/Shemas').modelUser;
const {default: mongoose } = require('mongoose');

module.exports.insertOne = async (userInput) => {
    const user = { username: userInput.username.toLowerCase(), password: userInput.encriptPassword, role: userInput.role, code: Math.floor(100000 + Math.random() * 900000), statut: 0 };
    const result = await User.create(user);
    return result;
}

module.exports.findOneByUsername = async (username) => {
    const user = await User.findOne({ username: username.toLowerCase() });
    if(user) {
        return user;
    } else {
        return null;
    }
}

module.exports.validation = async (username, code) => {
    const user = await User.findOne({ username: username.toLowerCase(), code: code });
    if(user) {
        const result = await updateCodeAndStatus(user._id);
        return result;
    } else {
        return null;
    }
}

updateCodeAndStatus = async (id) => {
    const valid_id = mongoose.Types.ObjectId(id);
    if(valid_id){
        const  result = await User.findOneAndUpdate({_id : id}, {code: 0, statut: true}, {new: true});
        return result;
    } else {
        return null;
    }
}

module.exports.list = async () => {
    const result = await User.find();
    return result;
}