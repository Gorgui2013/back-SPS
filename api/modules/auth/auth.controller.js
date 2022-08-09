const bcrypt = require("bcrypt");
const AuthService = require('./auth.service');
const nodemailer = require("nodemailer");
const User = require('../model/Shemas').modelUser;

let transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port:  process.env.PORT_MAIL,
    secure: process.env.SECURE_MAIL,
    auth: {
      user: process.env.USERNAME_MAIL,
      pass: process.env.PASSWORD_MAIL,
    },
});

module.exports.register = async (req, res) => {
    const user = await AuthService.register(req.body);

    if(!user) {
        res.status(401).send({ error: "Username or Password incorrect" });
    } else {
        let info = await transporter.sendMail({
            from: '"SenProxiService" <gorgui.dev@gmail.com>',
            to: req.body.email,
            subject: "Code de validation SenProxiService",
            html: "<p>Bonjour <strong>"+req.body.username+"</strong></p><br><br><p>Votre code de validation est : <strong>"+ user.code +"</strong></p><br><p>Cordialement</p><br><p><strong> &copy; SenProxiService</strong></p>", 
        });
        // delete user.email;
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).send(user);
    }
}

module.exports.login = async (req, res) => {
    const data = req.body;
    const user = await AuthService.login(data);
    if(!user) {
        res.status(401).send({ error: "Username or Password incorrect" });
    } else {
        if(user.user.code == 0) {
            res.status(200).send(user);
        } else {
            res.status(401).send({ error: "Username or Password incorrect" });
        }
    }
}

module.exports.validation = async (req, res) => {
    const user = await AuthService.validation(req.body);
    if(!user) {
        res.status(401).send({ error: "Code invalide" });
    } else {
        res.status(200).send({ success: "Code valide" });
    }
}

module.exports.list = async (req, res) => {
    res.send(await AuthService.listUsers());
}