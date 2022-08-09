const AuthService = require('./auth.service');
module.exports = (app) => {
    app.use(async (req, res, next) => {
        const authorization = req.headers.authorization || "";
        try {
            const tokenValidation = await AuthService.verifyToken(authorization.replace('Bearer ', ''));
            req.user = tokenValidation;
            next();
        } catch(error) {
            res.status(401).send('Session Expired!');
        }

        // AuthService.verifyToken(authorization)
        // .then((result) => {})
        // .catch((error) => {})
        
        
    })
}